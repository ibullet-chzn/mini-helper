import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

const getProjectPath = (document: vscode.TextDocument | null) => {
  if (!document) {
    document = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.document
      : null;
  }
  if (!document) {
    console.error("当前激活的编辑器不是文件或者没有文件被打开！");
    return "";
  }
  // @ts-ignore
  const currentFile = (document.uri ? document.uri : document).fsPath;
  let projectPath = null;
  // @ts-ignore
  let workspaceFolders = vscode.workspace.workspaceFolders.map(
    (item) => item.uri.path
  );
  workspaceFolders.forEach((folder) => {
    if (currentFile.indexOf(folder) === 0) {
      projectPath = folder;
    }
  });
  if (!projectPath) {
    console.error("获取工程根路径异常！");
    return "";
  }
  return projectPath;
};

export { getProjectPath };
