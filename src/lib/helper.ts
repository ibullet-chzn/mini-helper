import { TextDocument, Position, Range } from "vscode";

export const getLastChar = (doc: TextDocument, pos: Position) => {
  return doc.getText(new Range(new Position(pos.line, pos.character - 1), pos));
};
