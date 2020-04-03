import * as vscode from "vscode";

import helloword from "./helloworld";
import jump from "./jump";
import completion from "./completion";
import hover from "./hover";

export function activate(context: vscode.ExtensionContext) {
  console.log("mini-helper 被激活了");
  helloword(context);
  jump(context);
  completion(context);
  hover(context);
}

export function deactivate() {}
