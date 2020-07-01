"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const commond_1 = require("../vs/commond");
/**
 * 创建 App Page Component 等内置函数
 */
exports.BuiltInFunctions = [
    {
        label: "App",
    },
    {
        label: "getApp",
    },
    {
        label: "Page",
        insertText: new vscode_1.SnippetString("Page({\n\t${0}\n})"),
    },
    {
        label: "getCurrentPages",
    },
    {
        label: "Component",
    },
    {
        label: "Behavior",
    },
    {
        label: "setTimeout",
    },
    {
        label: "clearTimeout",
    },
    {
        label: "setInterval",
    },
    {
        label: "clearInterval",
    },
    {
        label: "wx",
        insertText: new vscode_1.SnippetString("wx."),
        command: commond_1.triggerSuggest,
    },
];
/**
 * 创建 wx.[api]
 */
exports.WxApis = [
    {
        label: "env",
    },
];
//# sourceMappingURL=api.js.map