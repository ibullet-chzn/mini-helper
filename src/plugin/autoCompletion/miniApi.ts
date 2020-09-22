import * as vscode from "vscode";
import { getLastChar } from "../../lib/helper";

import {
  getWxInput,
  getBracketRange,
  getApiTag,
  searchBuiltInFunctions,
  searchWxApis,
  searchWxApiParams,
} from "../../lib/apiHelper";

export default function (context: vscode.ExtensionContext) {
  // 注册代码建议提示，只有当按下“.”时才触发
  let disposable = vscode.languages.registerCompletionItemProvider(
    ["javascript", "typescript"],
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    ".",
    "\n"
  );
  context.subscriptions.push(disposable);
}

/**
 * 自动提示实现，这里模拟一个很简单的操作
 * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
 * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken,
  context: vscode.CompletionContext
) {
  // token表示由于用户继续输入而取消当前事件
  if (token.isCancellationRequested) {
    return Promise.resolve([]);
  }
  // 用户输入的最后一个字符
  let inputCharacter =
    context.triggerCharacter || getLastChar(document, position);
  // 正在输入的词
  const wxInput = getWxInput(document, position);
  // 匹配api属性
  const apiTag = getApiTag(document, position);
  console.log(inputCharacter);
  console.log(apiTag);
  switch (inputCharacter) {
    case ".":
      return [...searchWxApis(wxInput)];
    case " ":
    case "\n":
      if (apiTag) {
        return [...searchWxApiParams(apiTag.name.split("."))];
      } else {
        return [...searchBuiltInFunctions()];
      }
    default:
      if (
        (inputCharacter >= "a" && inputCharacter <= "z") ||
        (inputCharacter >= "A" && inputCharacter <= "Z")
      ) {
        if (apiTag) {
          return [...searchWxApiParams(apiTag.name.split("."))];
        } else {
          return [...searchBuiltInFunctions()];
        }
      }
      return [] as any;
  }
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(
  item: vscode.CompletionItem,
  token: vscode.CancellationToken
) {
  return null;
}
