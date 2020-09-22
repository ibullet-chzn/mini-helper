import { SnippetString, MarkdownString } from "vscode";
import { VSCodeCommand, triggerSuggest } from "../vs/commond";

/**
 * 小程序推荐使用ts开发 官方提供的库 miniprogram-api-typings 很好用
 * 但ts提供的语法提示 稍微显得有点单薄 没有代码补全等必要参数提示
 * 所以采用插件的方式弥补一下 插件提供快速创建模版代码 仅提供常用参数
 */

export interface Params {
  label: string;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

export interface BuiltInFunction {
  label: string;
  params?: Params[];
  command?: VSCodeCommand;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

export interface WxApi {
  label: string;
  params?: Params[];
  command?: VSCodeCommand;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

/**
 * 创建 App Page Component 等内置函数
 */
export const BuiltInFunctions: BuiltInFunction[] = [
  {
    label: "App",
    insertText: new SnippetString("App({\n\t${0}\n})"),
    command: triggerSuggest,
    params: [
      {
        label: "onLaunch",
        documentation: new MarkdownString(
          "### 生命周期回调——监听小程序初始化。"
        ),
      },
      {
        label: "onShow",
        documentation: new MarkdownString(
          "### 生命周期回调——监听小程序启动或切前台。"
        ),
      },
    ],
  },
  {
    label: "getApp",
  },
  {
    label: "Page",
    insertText: new SnippetString("Page({\n\t${0}\n})"),
  },
  {
    label: "getCurrentPages",
    insertText: new SnippetString("getCurrentPages()"),
    documentation: new MarkdownString(
      "### 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。"
    ),
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
    insertText: new SnippetString("wx."),
    command: triggerSuggest,
  },
];

/**
 * 创建 wx.[api]
 */
export const WxApis: WxApi[] = [
  {
    label: "env",
    insertText: new SnippetString("env"),
    documentation: new MarkdownString("### 环境变量"),
  },
  {
    label: "canIUse",
    insertText: new SnippetString("canIUse($0)"),
    documentation: new MarkdownString(
      "### 判断小程序的API，回调，参数，组件等是否在当前版本可用。"
    ),
  },
  {
    label: "getSystemInfo",
    insertText: new SnippetString("getSystemInfo({\n\t$0\n})"),
    command: triggerSuggest,
    params: [
      {
        label: "success",
        insertText: new SnippetString("success() {\n\t${0}\n}"),
        documentation: new MarkdownString("### 接口调用成功的回调函数"),
      },
      {
        label: "fail",
        insertText: new SnippetString("fail() {\n\t${0}\n}"),
        documentation: new MarkdownString("### 接口调用失败的回调函数"),
      },
      {
        label: "complete",
        insertText: new SnippetString("complete() {\n\t${0}\n}"),
        documentation: new MarkdownString(
          "### 接口调用结束的回调函数（调用成功、失败都会执行）"
        ),
      },
    ],
    documentation: new MarkdownString(
      "### 判断小程序的API，回调，参数，组件等是否在当前版本可用。"
    ),
  },
];
