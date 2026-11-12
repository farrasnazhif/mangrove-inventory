import { META } from "../../../components/ui/meta.ts";

import { EXTENDED_COMPONENTS } from "./extended-catalog.ts";

export const SANDBOX_COMPONENTS = [
  ...EXTENDED_COMPONENTS,
  ...META.map(({ id, title, caption }) => ({ id, title, caption })),
  {
    id: "buttons",
    title: "Buttons",
    caption: "Variants, sizes, and disabled/loading states.",
  },
  {
    id: "inputs",
    title: "Inputs",
    caption: "Labeled fields with validation and disabled states.",
  },
  {
    id: "badges",
    title: "Badges",
    caption: "Custom labels and semantic tones, plus project status indicators.",
  },
  {
    id: "notices",
    title: "Notices",
    caption: "Success, information, and recoverable errors.",
  },
  {
    id: "dialog",
    title: "Dialog",
    caption: "A focus-managed overlay with confirm and cancel actions.",
  },
  {
    id: "switches",
    title: "Switches",
    caption: "Accessible toggles for boolean preferences.",
  },
  {
    id: "tabs",
    title: "Tabs",
    caption: "Keyboard navigation between related views.",
  },
  {
    id: "typography",
    title: "Typography",
    caption: "Heading, title, body, and caption styles with weight options.",
  },
  {
    id: "data-states",
    title: "Data States",
    caption: "Loading, empty, unavailable, and retry states.",
  },
].sort((a, b) => a.title.localeCompare(b.title, "en"));
