import * as fs from "fs";
import * as path from "path";
import {
  workspace,
  languages,
  ExtensionContext,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
} from "vscode";

import { getConfig } from "../../lib/config";
import { getLastChar } from "../../lib/helper";
import { getWxmlTag } from "../../lib/wxmlHelper";
import { parseStyleFile } from "../../lib/wxssHelper";

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
        const { wxssGlobalPath } = getConfig();
        let exts = ["wxss"];
        let dir = path.dirname(document.fileName);
        let basename = path.basename(
          document.fileName,
          path.extname(document.fileName)
        );
        let localFile = exts
          .map((e) => path.join(dir, basename + "." + e))
          .find((f) => fs.existsSync(f));
        let wf = workspace.getWorkspaceFolder(document.uri);
        let globalStyle: any = [];
        if (wf) {
          let files = wxssGlobalPath.map(
            (f: string) => wf && path.resolve(wf.uri.fsPath, f)
          );
          globalStyle = files.map((file: string) => {
            return file ? parseStyleFile(file) : [];
          });
        }

        if (localFile) {
          let r: any = [];
          [...[parseStyleFile(localFile)], ...globalStyle].forEach((item) => {
            r.push(
              ...item.styles.map((style: any) => {
                return new CompletionItem(style.name, CompletionItemKind.Field);
              })
            );
          });
          return [...r];
        }
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
