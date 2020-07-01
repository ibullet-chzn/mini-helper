import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import { BuiltInFunctions, BuiltInFunction, WxApis, WxApi } from "../mini/api";
import { MiniHelper } from "./lib";

/**
 * 获取输入环境
 */
export const getWxInput = (
  doc: TextDocument,
  pos: Position
): MiniHelper.WxInput => {
  /**
   * 处理正在输入的词
   * 1 利用vs code提供的api
   * 2 解析光标前的单词(以空格分割)
   */
  const vsInputWord = doc.getWordRangeAtPosition(pos, /\b[\w.]+$/);
  return {
    input: doc.getText(vsInputWord),
  };
};

/**
 * 匹配内置函数
 */
export const searchBuiltInFunctions = () => {
  let globalBuiltInFunctions: BuiltInFunction[] = [];
  BuiltInFunctions.forEach((item: BuiltInFunction) => {
    globalBuiltInFunctions.push(item);
  });
  return globalBuiltInFunctions.map((item: BuiltInFunction) => {
    let globalBuiltInFunction = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
    if (item.command) {
      globalBuiltInFunction.command = item.command;
    }
    globalBuiltInFunction.insertText = item.insertText;
    globalBuiltInFunction.documentation = item.documentation;
    return globalBuiltInFunction;
  });
};

/**
 * 匹配微信api
 */
export const searchWxApis = (wxInput: MiniHelper.WxInput) => {
  const { input } = wxInput;
  if (input === "wx.") {
    let globalWxApis: WxApi[] = [];
    WxApis.forEach((item: WxApi) => {
      globalWxApis.push(item);
    });
    return globalWxApis.map((item: WxApi) => {
      let globalWxApi = new CompletionItem(
        item.label,
        CompletionItemKind.Field
      );
      globalWxApi.insertText = item.insertText;
      globalWxApi.documentation = item.documentation;
      return globalWxApi;
    });
  }
  return [];
};
