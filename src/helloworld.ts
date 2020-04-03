import * as vscode from "vscode";

export default function (context: vscode.ExtensionContext) {
  // 注册命令的API，执行后会返回一个Disposable对象
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World！你好，同学！");
    }
  );
  // 所有注册类的API执行后都需要将返回结果放到context.subscriptions中去
  context.subscriptions.push(disposable);
}
