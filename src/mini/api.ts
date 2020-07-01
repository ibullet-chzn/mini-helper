import { SnippetString, MarkdownString } from "vscode";
import { VSCodeCommand, triggerSuggest } from "../vs/commond";

/**
 * 小程序推荐使用ts开发 官方提供的库 miniprogram-api-typings 很好用
 * 但ts提供的语法提示 稍微显得有点单薄 没有代码补全等必要参数提示
 * 所以采用插件的方式弥补一下 插件提供快速创建模版代码 仅提供常用参数
 */

export interface BuiltInFunction {
  label: string;
  command?: VSCodeCommand;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

export interface WxApi {
  label: string;
  insertText?: string | SnippetString;
  documentation?: string | MarkdownString;
}

/**
 * 创建 App Page Component 等内置函数
 */
export const BuiltInFunctions: BuiltInFunction[] = [
  {
    label: "App",
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
  },
];
