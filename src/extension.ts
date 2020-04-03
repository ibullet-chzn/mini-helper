import * as vscode from "vscode";

import helloword from "./helloworld";
import jump from "./jump";
import completionMiniApi from "./completion/miniApi";
import completionMiniComponent from "./completion/miniComponent";
import hover from "./hover";

export function activate(context: vscode.ExtensionContext) {
  console.log("mini-helper 3");
  helloword(context);
  jump(context);
  completionMiniApi(context);
  completionMiniComponent(context);
  hover(context);
}

export function deactivate() {}
