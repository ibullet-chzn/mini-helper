"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const helper_1 = require("../../lib/helper");
const apiHelper_1 = require("../../lib/apiHelper");
function default_1(context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    let disposable = vscode.languages.registerCompletionItemProvider(["javascript", "typescript"], {
        provideCompletionItems,
        resolveCompletionItem,
    }, ".");
    context.subscriptions.push(disposable);
}
exports.default = default_1;
/**
 * 自动提示实现，这里模拟一个很简单的操作
 * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
 * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(document, position, token, context) {
    // token表示由于用户继续输入而取消当前事件
    if (token.isCancellationRequested) {
        return Promise.resolve([]);
    }
    // 用户输入的最后一个字符
    let inputCharacter = context.triggerCharacter || helper_1.getLastChar(document, position);
    console.log(inputCharacter);
    const wxInput = apiHelper_1.getWxInput(document, position);
    switch (inputCharacter) {
        case ".":
            return [...apiHelper_1.searchWxApis(wxInput)];
        default:
            if (inputCharacter >= "a" && inputCharacter <= "z") {
                return [...apiHelper_1.searchBuiltInFunctions()];
            }
            else if (inputCharacter >= "A" && inputCharacter <= "Z") {
                return [...apiHelper_1.searchBuiltInFunctions()];
            }
            return [];
    }
}
/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item, token) {
    return null;
}
//# sourceMappingURL=miniApi.js.map