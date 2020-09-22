import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import {
  BuiltInFunctions,
  BuiltInFunction,
  WxApis,
  WxApi,
  Params,
} from "../mini/api";
import { MiniHelper } from "./lib";
import { REGEXP_LASTBlANK_END } from "../lib/regular";

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
 * 匹配api范围
 */
export const getBracketRange = (doc: TextDocument, pos: Position) => {
  const text = doc.getText();
  const offset = doc.offsetAt(pos);
  const textBeforePos = text.substr(0, offset);
  // 1 找 ( 起始括号
  const startBracket = textBeforePos.lastIndexOf("(");
  if (
    startBracket < 0 || // 前没有开始符(
    textBeforePos.lastIndexOf(")") > startBracket // 或者不在api中
  ) {
    return null;
  }
  // 2 找 ) 结束标签
  let endBracket = text.indexOf(")", offset);
  // 未找到闭合 > 文件结束位置为结束
  if (endBracket < 0) {
    endBracket = text.length;
  }
  return {
    start: startBracket,
    end: endBracket,
    length: endBracket - startBracket,
    tagOffset: offset - startBracket,
  };
};

/**
 * 获取正在输入的api
 */
export const getApiTag = (doc: TextDocument, pos: Position) => {
  const range = getBracketRange(doc, pos);
  if (!range) {
    return null;
  }
  const { start, length, tagOffset } = range;
  const text = doc.getText();
  /** 匹配括号前的api名 */
  const RegApiName = text
    .substr(0, start)
    .match(new RegExp(REGEXP_LASTBlANK_END));
  if (RegApiName && RegApiName[1]) {
    return {
      name: RegApiName[1],
    };
  }
  return null;
};

/**
 * 匹配内置函数
 */
export const searchBuiltInFunctions = () => {
  return BuiltInFunctions.map((item: BuiltInFunction) => {
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
    return WxApis.map((item: WxApi) => {
      let globalWxApi = new CompletionItem(
        item.label,
        CompletionItemKind.Field
      );
      globalWxApi.insertText = item.insertText;
      globalWxApi.documentation = item.documentation;
      globalWxApi.command = item.command;
      return globalWxApi;
    });
  }
  return [];
};

/**
 * 匹配api的参数 解决参数为Object的语法提示
 */
export const searchWxApiParams = (ApiTags: String[]) => {
  const tagLength = ApiTags.length;
  console.log(tagLength);
  if (tagLength === 1) {
    // 匹配内置函数
    let globalBuiltInFunctionParams: Params[] = [];
    BuiltInFunctions.forEach((item: BuiltInFunction) => {
      if (ApiTags[0] === item.label) {
        globalBuiltInFunctionParams = item.params || [];
      }
    });
    return globalBuiltInFunctionParams.map((item: WxApi) => {
      let globalBuiltInFunction = new CompletionItem(
        item.label,
        CompletionItemKind.Field
      );
      globalBuiltInFunction.insertText = item.insertText;
      globalBuiltInFunction.documentation = item.documentation;
      return globalBuiltInFunction;
    });
  } else if (tagLength === 2) {
    // 匹配wx.api
    let globalWxApiParams: Params[] = [];
    WxApis.forEach((item: BuiltInFunction) => {
      if (ApiTags[1] === item.label) {
        globalWxApiParams = item.params || [];
      }
    });
    return globalWxApiParams.map((item: WxApi) => {
      let globalWxApi = new CompletionItem(
        item.label,
        CompletionItemKind.Field
      );
      globalWxApi.insertText = item.insertText;
      globalWxApi.documentation = item.documentation;
      return globalWxApi;
    });
  }
  return [] as any;
};
