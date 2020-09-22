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
        insertText: new vscode_1.SnippetString("App({\n\t${0}\n})"),
        command: commond_1.triggerSuggest,
        params: [
            {
                label: "onLaunch",
                documentation: new vscode_1.MarkdownString("### 生命周期回调——监听小程序初始化。"),
            },
            {
                label: "onShow",
                documentation: new vscode_1.MarkdownString("### 生命周期回调——监听小程序启动或切前台。"),
            },
        ],
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
        insertText: new vscode_1.SnippetString("getCurrentPages()"),
        documentation: new vscode_1.MarkdownString("### 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。"),
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
        insertText: new vscode_1.SnippetString("env"),
        documentation: new vscode_1.MarkdownString("### 环境变量"),
    },
    {
        label: "canIUse",
        insertText: new vscode_1.SnippetString("canIUse($0)"),
        documentation: new vscode_1.MarkdownString("### 判断小程序的API，回调，参数，组件等是否在当前版本可用。"),
    },
    {
        label: "getSystemInfo",
        insertText: new vscode_1.SnippetString("getSystemInfo({\n\t$0\n})"),
        command: commond_1.triggerSuggest,
        params: [
            {
                label: "success",
                insertText: new vscode_1.SnippetString("success() {\n\t${0}\n}"),
                documentation: new vscode_1.MarkdownString("### 接口调用成功的回调函数"),
            },
            {
                label: "fail",
                insertText: new vscode_1.SnippetString("fail() {\n\t${0}\n}"),
                documentation: new vscode_1.MarkdownString("### 接口调用失败的回调函数"),
            },
            {
                label: "complete",
                insertText: new vscode_1.SnippetString("complete() {\n\t${0}\n}"),
                documentation: new vscode_1.MarkdownString("### 接口调用结束的回调函数（调用成功、失败都会执行）"),
            },
        ],
        documentation: new vscode_1.MarkdownString("### 判断小程序的API，回调，参数，组件等是否在当前版本可用。"),
    },
];
//# sourceMappingURL=api.js.map