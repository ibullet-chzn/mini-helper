import * as vscode from "vscode";
import { getProjectPath } from "../utils";

export default function (context: vscode.ExtensionContext) {
  // 注册代码建议提示，只有当按下“.”时才触发
  let disposable = vscode.languages.registerCompletionItemProvider(
    "javascript",
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
  const line = document.lineAt(position);
  const projectPath = getProjectPath(document);

  // 只截取到光标位置为止，防止一些特殊情况
  const lineText = line.text.substring(0, position.character);
  // 简单匹配，只要当前光标前的字符串为`this.dependencies.`都自动带出所有的依赖
  if (/(^|=| )\w+\.dependencies\.$/g.test(lineText)) {
    const json = require(`${projectPath}/package.json`);
    const dependencies = Object.keys(json.dependencies || {}).concat(
      Object.keys(json.devDependencies || {})
    );

    return dependencies.map((dep) => {
      // vscode.CompletionItemKind 表示提示的类型
      return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
    });
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
