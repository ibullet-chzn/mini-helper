import {
  languages,
  ExtensionContext,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
} from "vscode";

import { WxmlSnippets, WxmlSnippet } from "../../mini/component";
import { getLastChar } from "../../lib/helper";
import {
  getWxmlTag,
  searchWxmlTagName,
  searchWxmlTagAttribute,
  searchBindingEvents,
  searchBubblingEvents,
} from "../../lib/wxmlHelper";

export default function (context: ExtensionContext) {
  // 根据微信文档 获取需要自动提示的字符
  let wxmlTrigger = WxmlSnippets.map((item: WxmlSnippet) => item.trigger);
  let disposable = languages.registerCompletionItemProvider(
    "wxml",
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    " ",
    ":",
    "\n",
    ...wxmlTrigger
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
  console.log(inputCharacter);
  // 解析用户输入的标签内容
  const wxmlTag = getWxmlTag(document, position);
  switch (inputCharacter) {
    case ":":
      if (wxmlTag) {
        return searchBubblingEvents(wxmlTag);
      }
    case " ":
      if (wxmlTag) {
        return searchWxmlTagAttribute(wxmlTag);
      }
    default:
      if (inputCharacter >= "a" && inputCharacter <= "z") {
        if (!wxmlTag) {
          return searchWxmlTagName(inputCharacter);
        }
        return [...searchWxmlTagAttribute(wxmlTag), ...searchBindingEvents()];
      }
      return [] as any;
  }
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item: CompletionItem, token: CancellationToken) {
  return null;
}
