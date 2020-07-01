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
import { getWxmlTag } from "../../lib/wxmlHelper";

export default function (context: ExtensionContext) {
  // 根据微信文档 获取需要自动提示的字符
  let disposable = languages.registerCompletionItemProvider(
    "wxml",
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    " ",
    "\n"
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
  if (wxmlTag) {
    const { onAttrValue, attrName } = wxmlTag;
    if (onAttrValue && attrName === "class") {
      if (
        inputCharacter === " " ||
        (inputCharacter >= "a" && inputCharacter <= "z") ||
        (inputCharacter >= "A" && inputCharacter <= "Z")
      ) {
        console.log("搜索");
        return [] as any;
      }
    }
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
