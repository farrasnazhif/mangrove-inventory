import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

type Reaction = { actions: { destinationId: string }[] };
let nextId = 0;
class Node {
  id = String(++nextId);
  name = "";
  x = 0; y = 0; width = 100; height = 100;
  children: Node[] = [];
  parent?: Node;
  fills: unknown[] = [];
  strokes: unknown[] = [];
  characters = "";
  fontName = { family: "Inter", style: "Regular" };
  reactions: Reaction[] = [];
  data: Record<string, string> = {};
  selection: Node[] = [];
  flowStartingPoints: { nodeId: string; name: string }[] = [];
  type: string;
  constructor(type: string) { this.type = type; }
  appendChild(node: Node) {
    if (node.parent) node.parent.children = node.parent.children.filter((child) => child !== node);
    node.parent = this;
    this.children.push(node);
  }
  remove() {
    assert.equal(this.children.length, 0, "Recovery must move content before removing a page");
    if (this.parent) this.parent.children = this.parent.children.filter((node) => node !== this);
  }
  resize(width: number, height: number) { this.width = width; this.height = height; }
  setPluginData(key: string, value: string) { this.data[key] = value; }
  getPluginData(key: string) { return this.data[key] ?? ""; }
  findAll(predicate: (node: Node) => boolean): Node[] {
    return this.children.flatMap((child) => [...(predicate(child) ? [child] : []), ...child.findAll(predicate)]);
  }
  findOne(predicate: (node: Node) => boolean) { return this.findAll(predicate)[0] ?? null; }
  createInstance(): Node {
    const clone = (source: Node): Node => {
      const n = new Node(source.type);
      Object.assign(n, source, { id: n.id, parent: undefined, children: [], data: { ...source.data } });
      source.children.forEach((child) => n.appendChild(clone(child)));
      return n;
    };
    const n = clone(this); n.type = "INSTANCE"; return n;
  }
  async setReactionsAsync(reactions: Reaction[]) { this.reactions = reactions; }
}

test("Figma generator preserves existing work and connects every theme and screen", async () => {
  const source = readFileSync(new URL("../docs/design/figma/prototype/code.js", import.meta.url), "utf8");
  const root = new Node("DOCUMENT");
  const original = new Node("PAGE"); original.name = "Existing user work"; root.appendChild(original);
  const fonts: string[] = [];
  const messages: string[] = [];
  const figma = {
    editorType: "figma", root, currentPage: original,
    loadAllPagesAsync: async () => {},
    viewport: { scrollAndZoomIntoView: (nodes: Node[]) => assert.equal(nodes.length, 1) },
    loadFontAsync: async (font: { family: string; style: string }) => { fonts.push(`${font.family}/${font.style}`); },
    createPage: () => { const n = new Node("PAGE"); root.appendChild(n); return n; },
    setCurrentPageAsync: async (page: Node) => { figma.currentPage = page; },
    createFrame: () => new Node("FRAME"), createComponent: () => new Node("COMPONENT"),
    createText: () => new Node("TEXT"), createPaintStyle: () => ({}), createTextStyle: () => ({}),
    createNodeFromSvg: (svg: string) => { assert.match(svg, /lucide/); const n = new Node("FRAME"); n.appendChild(new Node("VECTOR")); return n; },
    combineAsVariants: (nodes: Node[], page: Node) => {
      const n = new Node("COMPONENT_SET"); page.appendChild(n); nodes.forEach((child) => n.appendChild(child));
      n.height = Math.max(...nodes.map((child) => child.y + child.height)); return n;
    },
    closePlugin: (message: string) => messages.push(message),
  };
  await runInNewContext(source, { figma, console: { log: () => {}, error: () => {} } });
  assert.match(messages[0], /Created 76 editable frames, 240 components/);
  assert.equal(root.children[0], original);
  assert.equal(original.children.length, 0);
  assert.equal(root.children.length, 4);
  assert.deepEqual([...new Set(fonts)], ["Inter/Regular", "Inter/Medium", "Inter/Semi Bold"]);
  const page = root.children[2];
  const frames = page.children.filter((node) => node.getPluginData("screenId"));
  assert.equal(frames.length, 76);
  assert.equal(page.flowStartingPoints.length, 4);
  for (const theme of ["Light", "Dark"]) {
    for (const width of [360, 1440]) {
      const screens = frames.filter((n) => n.width === width && n.getPluginData("theme") === theme && n.getPluginData("variant") === "Default");
      assert.equal(screens.length, 12);
      const results = screens.find((n) => n.getPluginData("screenId") === "SCR-06");
      assert.ok(results?.findOne((n) => n.characters.includes("Total ecosystem carbon is not calculated")));
      const map = screens.find((n) => n.getPluginData("screenId") === "SCR-07");
      assert.ok(map?.findOne((n) => n.characters.includes("no map provider or real coordinates")));
    }
  }
  const ids = new Set(frames.map((n) => n.id));
  const links = page.findAll((n) => n.reactions.length > 0);
  assert.ok(links.length > 100);
  for (const link of links) for (const action of link.reactions[0].actions) assert.ok(ids.has(action.destinationId));
  const reference = root.children[3];
  assert.equal(reference.children.filter((n) => n.getPluginData("referencePanel")).length, 20);
  assert.equal(reference.flowStartingPoints.length, 4);
  assert.ok(reference.findOne((n) => n.characters.includes("SOC belum tersedia · total tidak dihitung")));
  const library = root.children[1];
  assert.equal(library.findAll((n) => n.type === "COMPONENT").length, 240);
  await runInNewContext(source, { figma, console: { log: () => {}, error: () => {} } });
  assert.equal(root.children.length, 4);
  assert.match(messages[1], /already exists/);

  // An interrupted attempt must reuse its screens and preserve every earlier layer.
  library.data = {}; page.data = {}; reference.data.dashboardReference = "building";
  const latestLibrary = library.createInstance(); latestLibrary.type = "PAGE";
  const latestPage = page.createInstance(); latestPage.type = "PAGE";
  root.appendChild(latestLibrary); root.appendChild(latestPage);
  const earlierIds = new Set([...library.children, ...page.children].map((n) => n.id));
  await runInNewContext(source, { figma, console: { log: () => {}, error: () => {} } });
  assert.match(messages[2], /Recovered 76/);
  assert.equal(root.children.length, 5);
  assert.equal(root.children[0], original);
  assert.equal(latestPage.getPluginData("mangroveDesign"), "complete");
  assert.equal(reference.getPluginData("dashboardReference"), "complete");
  const archive = root.children.find((n) => n.name === "Archived generator drafts");
  assert.ok(archive);
  for (const id of earlierIds) assert.ok(archive.findOne((n) => n.id === id));
});
