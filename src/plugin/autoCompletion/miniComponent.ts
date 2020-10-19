import {
  languages,
  ExtensionContext,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  CompletionItem,
} from "vscode";

import { getLastChar } from "../../lib/helper";
import {
  getWxmlTag,
  searchWxmlTagName,
  searchWxmlTagAttribute,
  searchBindingEvents,
  searchBubblingEvents,
  searchCommonAttributes,
  searchWxmlAttributes,
} from "../../lib/wxmlHelper";

export default function (context: ExtensionContext) {
  let disposable = languages.registerCompletionItemProvider(
    "wxml",
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    " ",
    ":"
  );
  context.subscriptions.push(disposable);
}

/**
 * 自动提示实现
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(
  document: TextDocument,
  position: Position,
  token: CancellationToken,
  context: CompletionContext
) {
  // token表示由于用户继续输入而取消当前事件
  if (token.isCancellationRequested) {
    return Promise.resolve([]);
  }
  // 用户输入的最后一个字符
  let inputCharacter =
    context.triggerCharacter || getLastChar(document, position);
  // 解析用户输入的标签内容
  const wxmlTag = getWxmlTag(document, position);
  if (wxmlTag && !wxmlTag.onAttrValue) {
    switch (inputCharacter) {
      case ":":
        if (wxmlTag) {
          return [
            ...searchWxmlAttributes(wxmlTag),
            ...searchBubblingEvents(wxmlTag),
          ];
        }
      case " ":
      case "\n":
        if (wxmlTag) {
          return [
            ...searchCommonAttributes(wxmlTag),
            ...searchWxmlTagAttribute(wxmlTag),
            ...searchBindingEvents(),
          ];
        }
      default:
        if (inputCharacter >= "a" && inputCharacter <= "z") {
          return [
            ...searchCommonAttributes(wxmlTag),
            ...searchWxmlTagAttribute(wxmlTag),
            ...searchBindingEvents(),
          ];
        }
        return [] as any;
    }
  } else if (!wxmlTag) {
    return searchWxmlTagName();
  }
  return [] as any;
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item: CompletionItem, token: CancellationToken) {
  return null;
}
