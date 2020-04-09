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

import { WxmlSnippets, Snippet } from "../../mini/component";
import { getLastChar } from "../../lib/helper";
import { getWxmlTag } from "../../lib/wxmlHelper";

export default function (context: ExtensionContext) {
  // 根据微信文档 获取需要自动提示的字符
  let wxmlTrigger = WxmlSnippets.map((item: Snippet) => item.trigger);
  let disposable = languages.registerCompletionItemProvider(
    "wxml",
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    " ",
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
  let char = context.triggerCharacter || getLastChar(document, position);
  switch (char) {
    case " ":
      const tag = getWxmlTag(document, position);
      console.log(tag);
      const dependencies = ["a", "b"];
      return dependencies.map((dep) => {
        return new CompletionItem(dep, CompletionItemKind.Field);
      });
    default:
      if (char >= "a" && char <= "z") {
        const tag = getWxmlTag(document, position);
        console.log(tag);
      }
      let wxmlCompletionItems: Snippet[] = [];
      WxmlSnippets.forEach((item: Snippet) => {
        if (item.trigger === char) {
          wxmlCompletionItems.push(item);
        }
      });
      return wxmlCompletionItems.map((item: Snippet) => {
        let wxmlCompletionItem = new CompletionItem(
          item.label,
          CompletionItemKind.Field
        );
        wxmlCompletionItem.insertText = item.insertText;
        wxmlCompletionItem.documentation = item.documentation;
        return wxmlCompletionItem;
      });
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
