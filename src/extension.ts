import * as vscode from "vscode";

import helloword from "./helloworld";
import jump from "./jump";
import completionMiniApi from "./plugin/autoCompletion/miniApi";
import completionMiniComponent from "./plugin/autoCompletion/miniComponent";
import hover from "./hover";

export function activate(context: vscode.ExtensionContext) {
  console.log("mini-helper 启动了");
  helloword(context);
  jump(context);
  completionMiniApi(context);
  completionMiniComponent(context);
  hover(context);
}

export function deactivate() {}
