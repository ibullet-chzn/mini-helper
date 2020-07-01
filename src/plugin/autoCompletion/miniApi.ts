import * as vscode from "vscode";
import { getLastChar } from "../../lib/helper";
import { getProjectPath } from "../../utils";

import {
  getWxInput,
  searchBuiltInFunctions,
  searchWxApis,
} from "../../lib/apiHelper";

export default function (context: vscode.ExtensionContext) {
  // 注册代码建议提示，只有当按下“.”时才触发
  let disposable = vscode.languages.registerCompletionItemProvider(
    ["javascript", "typescript"],
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    "."
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
  console.log(inputCharacter);

  const wxInput = getWxInput(document, position);

  switch (inputCharacter) {
    case ".":
      return [...searchWxApis(wxInput)];
    default:
      if (inputCharacter >= "a" && inputCharacter <= "z") {
        return [...searchBuiltInFunctions()];
      } else if (inputCharacter >= "A" && inputCharacter <= "Z") {
        return [...searchBuiltInFunctions()];
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
