import { SnippetString, MarkdownString } from "vscode";
import { Mini } from "./mini";

export interface Snippet {
  label: string;
  trigger: string;
  attribute?: Mini.Attributes;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

export const WxmlSnippets: Snippet[] = [
  {
    label: "view",
    trigger: "v",
    attribute: [
      {
        label: "hover-class",
        documentation:
          "指定按下去的样式类。当 hover-class='none' 时，没有点击态效果",
      },
      {
        label: "hover-stop-propagation",
        documentation: "指定是否阻止本节点的祖先节点出现点击态",
      },
      {
        label: "hover-start-time",
        documentation: "按住后多久出现点击态，单位毫秒",
      },
      {
        label: "hover-stay-time",
        documentation: "手指松开后点击态保留时间，单位毫秒",
      },
    ],
    insertText: new SnippetString("<view $1>${0:text}</view>"),
    documentation: new MarkdownString("### 视图容器"),
  },
];
