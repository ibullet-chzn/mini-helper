import * as vscode from "vscode";

import helloword from "./helloworld";
import jump from "./jump";
import completionMiniApi from "./plugin/autoCompletion/miniApi";
import completionMiniComponent from "./plugin/autoCompletion/miniComponent";
import completionMiniWxss from "./plugin/autoCompletion/miniWxss";
import hover from "./hover";

export function activate(context: vscode.ExtensionContext) {
  console.log("mini-helper 启动了");
  helloword(context);
  jump(context);
  completionMiniApi(context);
  completionMiniComponent(context);
  completionMiniWxss(context);
  hover(context);
}

export function deactivate() {}
