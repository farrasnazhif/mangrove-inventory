export type ChatRole = "manager" | "visitor";

export type ChatTurn = {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** assistant answers built from inventory data cite it as a source */
  sourced?: boolean;
};

export type Conversation = {
  id: string;
  role: ChatRole;
  turns: ChatTurn[];
};
