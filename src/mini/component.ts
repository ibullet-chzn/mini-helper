import { SnippetString, MarkdownString } from "vscode";
import { Mini } from "./mini";

/**
 * 针对wxml内置组件的提示源文件
 * 包括绑定事件、通用属性(html&mini)、组件本身属性的提示
 */

export interface BindingEvent {
  label: string;
  version?: string;
  documentation?: string | MarkdownString;
}

export interface BubblingEvent {
  label: string;
  version?: string;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

export interface Attribute {
  label: string;
}

export interface WxAttribute {
  label: string;
}

export interface WxForAttribute {
  label: string;
}

export interface WxmlSnippet {
  label: string;
  trigger: string;
  attribute?: Mini.Attribute[];
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

export const BindingEvents: BindingEvent[] = [
  {
    label: "bind:",
  },
  {
    label: "catch:",
    documentation: "与 bind 不同，catch 会阻止事件向上冒泡",
  },
  {
    label: "mut-bind:",
    version: "2.8.2",
    documentation:
      "所有 mut-bind 是“互斥”的，只会有其中一个绑定函数被触发。同时，它完全不影响 bind 和 catch 的绑定效果",
  },
  {
    label: "capture-bind:",
    version: "1.5.0",
    documentation:
      "触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。",
  },
  {
    label: "capture-catch:",
    version: "1.5.0",
    documentation:
      "触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。",
  },
];

export const BubblingEvents: BubblingEvent[] = [
  {
    label: "touchstart",
    insertText: new SnippetString('touchstart="${0}"'),
  },
  {
    label: "touchmove",
    insertText: new SnippetString('touchmove="${0}"'),
  },
  {
    label: "touchcancel",
    insertText: new SnippetString('touchcancel="${0}"'),
  },
  {
    label: "touchend",
    insertText: new SnippetString('touchend="${0}"'),
  },
  {
    label: "tap",
    insertText: new SnippetString('tap="${0}"'),
  },
  {
    label: "longpress",
    insertText: new SnippetString('longpress="${0}"'),
  },
  {
    label: "longtap",
    insertText: new SnippetString('longtap="${0}"'),
  },
  {
    label: "transitionend",
    insertText: new SnippetString('transitionend="${0}"'),
  },
  {
    label: "animationstart",
    insertText: new SnippetString('animationstart="${0}"'),
  },
  {
    label: "animationiteration",
    insertText: new SnippetString('animationiteration="${0}"'),
  },
  {
    label: "animationend",
    insertText: new SnippetString('animationend="${0}"'),
  },
  {
    label: "touchforcechange",
    insertText: new SnippetString('touchforcechange="${0}"'),
  },
];

export const Attributes: Attribute[] = [
  {
    label: "id",
  },
  {
    label: "class",
  },
  {
    label: "style",
  },
  {
    label: "hidden",
  },
  {
    label: "wx:",
  },
];

export const WxAttributes: WxAttribute[] = [
  {
    label: "if",
  },
  {
    label: "elif",
  },
  {
    label: "else",
  },
  {
    label: "for",
  },
  {
    label: "key",
  },
];

export const WxForAttributes: WxForAttribute[] = [
  {
    label: "key",
  },
  {
    label: "for-item",
  },
  {
    label: "for-index",
  },
];

export const WxmlSnippets: WxmlSnippet[] = [
  {
    label: "view",
    trigger: "v",
    attribute: [
      {
        label: "hover-class",
        type: "string",
        default: "none",
        required: false,
        version: "1.0.0",
        documentation:
          "指定按下去的样式类。当 hover-class='none' 时，没有点击态效果",
        insertText: new SnippetString('hover-class="none"'),
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
