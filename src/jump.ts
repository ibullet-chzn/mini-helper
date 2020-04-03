/**
 * 跳转到定义示例，本示例支持`package.json`中`dependencies`、`devDependencies`跳转到对应依赖包。
 */
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export default function (context: vscode.ExtensionContext) {
  // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
  let provider = vscode.languages.registerDefinitionProvider(["json"], {
    provideDefinition,
  });
  context.subscriptions.push(provider);
}

/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document
 * @param {*} position
 * @param {*} token
 */
function provideDefinition(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken
) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const line = document.lineAt(position);
  if (/\/package\.json$/.test(fileName)) {
    console.log(word, line.text);
    const json = document.getText();
    // 这里我们偷懒只做一个简单的正则匹配
    if (
      new RegExp(
        `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
          /\//g,
          "\\/"
        )}[\\s\\S]*?\\}`,
        "gm"
      ).test(json)
    ) {
      let destPath = `${workDir}/node_modules/${word.replace(
        /"/g,
        ""
      )}/README.md`;
      if (fs.existsSync(destPath)) {
        // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
        return new vscode.Location(
          vscode.Uri.file(destPath),
          new vscode.Position(0, 0)
        );
      }
    }
  }
}
