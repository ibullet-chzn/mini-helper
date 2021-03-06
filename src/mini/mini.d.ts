import { SnippetString, MarkdownString } from "vscode";

export namespace Mini {
  export interface Attribute {
    label: string;
    type?: string;
    default?: string;
    required?: boolean;
    documentation?: string | MarkdownString;
    version?: string;
    insertText?: string | SnippetString;
  }
}
