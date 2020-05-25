export interface VSCodeCommand {
  command: string;
  title: string;
}

export const triggerSuggest: VSCodeCommand = {
  command: "editor.action.triggerSuggest",
  title: "triggerSuggest",
};
