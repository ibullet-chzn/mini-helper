"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
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
//# sourceMappingURL=event.js.map