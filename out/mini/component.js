"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const commond_1 = require("../vs/commond");
exports.BindingEvents = [
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
        documentation: "所有 mut-bind 是“互斥”的，只会有其中一个绑定函数被触发。同时，它完全不影响 bind 和 catch 的绑定效果",
    },
    {
        label: "capture-bind:",
        version: "1.5.0",
        documentation: "触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。",
    },
    {
        label: "capture-catch:",
        version: "1.5.0",
        documentation: "触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。",
    },
];
exports.BubblingEvents = [
    {
        label: "touchstart",
        insertText: new vscode_1.SnippetString('touchstart="${0}"'),
    },
    {
        label: "touchmove",
        insertText: new vscode_1.SnippetString('touchmove="${0}"'),
    },
    {
        label: "touchcancel",
        insertText: new vscode_1.SnippetString('touchcancel="${0}"'),
    },
    {
        label: "touchend",
        insertText: new vscode_1.SnippetString('touchend="${0}"'),
    },
    {
        label: "tap",
        insertText: new vscode_1.SnippetString('tap="${0}"'),
    },
    {
        label: "longpress",
        insertText: new vscode_1.SnippetString('longpress="${0}"'),
    },
    {
        label: "longtap",
        insertText: new vscode_1.SnippetString('longtap="${0}"'),
    },
    {
        label: "transitionend",
        insertText: new vscode_1.SnippetString('transitionend="${0}"'),
    },
    {
        label: "animationstart",
        insertText: new vscode_1.SnippetString('animationstart="${0}"'),
    },
    {
        label: "animationiteration",
        insertText: new vscode_1.SnippetString('animationiteration="${0}"'),
    },
    {
        label: "animationend",
        insertText: new vscode_1.SnippetString('animationend="${0}"'),
    },
    {
        label: "touchforcechange",
        insertText: new vscode_1.SnippetString('touchforcechange="${0}"'),
    },
];
exports.Attributes = [
    {
        label: "id",
        insertText: new vscode_1.SnippetString('id="${0}"'),
    },
    {
        label: "class",
        insertText: new vscode_1.SnippetString('class="${0}"'),
    },
    {
        label: "style",
        insertText: new vscode_1.SnippetString('style="${0}"'),
    },
    {
        label: "hidden",
        insertText: new vscode_1.SnippetString('hidden="${0}"'),
    },
    {
        label: "wx:",
        command: commond_1.triggerSuggest,
    },
];
exports.WxAttributes = [
    {
        label: "if",
        insertText: new vscode_1.SnippetString('if="${0}"'),
    },
    {
        label: "elif",
        insertText: new vscode_1.SnippetString('elif="${0}"'),
    },
    {
        label: "else",
        insertText: new vscode_1.SnippetString('else="${0}"'),
    },
    {
        label: "for",
        insertText: new vscode_1.SnippetString('for="{{${0}}}"'),
    },
];
exports.WxForAttributes = [
    {
        label: "key",
        insertText: new vscode_1.SnippetString('key="${0}"'),
    },
    {
        label: "for-item",
        insertText: new vscode_1.SnippetString('for-item="${0}"'),
    },
    {
        label: "for-index",
        insertText: new vscode_1.SnippetString('for-index="${0}"'),
    },
];
exports.WxmlSnippets = [
    {
        label: "view",
        attribute: [
            {
                label: "hover-class",
                type: "string",
                default: "none",
                required: false,
                documentation: "指定按下去的样式类。当 hover-class='none' 时，没有点击态效果",
                insertText: new vscode_1.SnippetString('hover-class="none"'),
            },
            {
                label: "hover-stop-propagation",
                type: "boolean",
                default: "false",
                required: false,
                version: "1.5.0",
                documentation: "指定是否阻止本节点的祖先节点出现点击态",
                insertText: new vscode_1.SnippetString('hover-stop-propagation="false"'),
            },
            {
                label: "hover-start-time",
                type: "number",
                default: "50",
                required: false,
                documentation: "按住后多久出现点击态，单位毫秒",
                insertText: new vscode_1.SnippetString('hover-start-time="50"'),
            },
            {
                label: "hover-stay-time",
                type: "number",
                default: "400",
                required: false,
                documentation: "手指松开后点击态保留时间，单位毫秒",
                insertText: new vscode_1.SnippetString('hover-stay-time="400"'),
            },
        ],
        insertText: new vscode_1.SnippetString("<view $1>$0</view>"),
        documentation: new vscode_1.MarkdownString("### 视图容器"),
    },
    {
        label: "cover-view",
        attribute: [
            {
                label: "scroll-top",
                type: "number/string",
                default: "",
                required: false,
                version: "2.1.0",
                documentation: "设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效",
                insertText: new vscode_1.SnippetString('scroll-top="$0"'),
            },
        ],
        insertText: new vscode_1.SnippetString("<cover-view $1>$0</cover-view>"),
        documentation: new vscode_1.MarkdownString("### 覆盖在原生组件之上的文本视图"),
    },
    {
        label: "cover-image",
        attribute: [
            {
                label: "src",
                type: "string",
                default: "",
                required: false,
                version: "1.4.0",
                documentation: "图标路径，支持临时路径、网络地址（1.6.0起支持）、云文件ID（2.2.3起支持）",
                insertText: new vscode_1.SnippetString('src="$0"'),
            },
            {
                label: "bindload",
                type: "eventhandle",
                default: "",
                required: false,
                version: "2.1.0",
                documentation: "图片加载成功时触发",
                insertText: new vscode_1.SnippetString('src="$0"'),
            },
            {
                label: "binderror",
                type: "eventhandle",
                default: "",
                required: false,
                version: "2.1.0",
                documentation: "图片加载失败时触发",
                insertText: new vscode_1.SnippetString('src="$0"'),
            },
        ],
        insertText: new vscode_1.SnippetString("<cover-image $1>$0</cover-image>"),
        documentation: new vscode_1.MarkdownString("### 覆盖在原生组件之上的图片视图。可覆盖的原生组件同cover-view，支持嵌套在cover-view里。"),
    },
    {
        label: "scroll-view",
        attribute: [
            {
                label: "scroll-x",
                type: "boolean",
                default: "false",
                required: false,
                documentation: "允许横向滚动",
                insertText: new vscode_1.SnippetString("scroll-x"),
            },
            {
                label: "scroll-y",
                type: "boolean",
                default: "false",
                required: false,
                documentation: "允许纵向滚动",
                insertText: new vscode_1.SnippetString("scroll-y"),
            },
        ],
        insertText: new vscode_1.SnippetString("<cover-view $1>$0</cover-view>"),
        documentation: new vscode_1.MarkdownString("### 覆盖在原生组件之上的文本视图"),
    },
];
//# sourceMappingURL=component.js.map