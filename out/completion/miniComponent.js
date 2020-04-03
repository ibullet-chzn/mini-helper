"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function default_1(context) {
    // 注册代码建议提示，只有当按下“ ”时才触发
    let disposable = vscode.languages.registerCompletionItemProvider("wxml", {
        provideCompletionItems,
        resolveCompletionItem,
    }, " ");
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
    const dependencies = ["a", "b"];
    console.log(dependencies);
    return dependencies.map((dep) => {
        // vscode.CompletionItemKind 表示提示的类型
        return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
    });
}
/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item, token) {
    return null;
}
//# sourceMappingURL=miniComponent.js.map