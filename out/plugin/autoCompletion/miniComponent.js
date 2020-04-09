"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const component_1 = require("../../mini/component");
const helper_1 = require("../../lib/helper");
const wxmlHelper_1 = require("../../lib/wxmlHelper");
function default_1(context) {
    // 根据微信文档 获取需要自动提示的字符
    let wxmlTrigger = component_1.WxmlSnippets.map((item) => item.trigger);
    let disposable = vscode_1.languages.registerCompletionItemProvider("wxml", {
        provideCompletionItems,
        resolveCompletionItem,
    }, " ", "\n", ...wxmlTrigger);
    context.subscriptions.push(disposable);
}
exports.default = default_1;
/**
 * 自动提示实现
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
    let char = context.triggerCharacter || helper_1.getLastChar(document, position);
    switch (char) {
        case " ":
            const tag = wxmlHelper_1.getWxmlTag(document, position);
            console.log(tag);
            const dependencies = ["a", "b"];
            return dependencies.map((dep) => {
                return new vscode_1.CompletionItem(dep, vscode_1.CompletionItemKind.Field);
            });
        default:
            if (char >= "a" && char <= "z") {
                const tag = wxmlHelper_1.getWxmlTag(document, position);
                console.log(tag);
            }
            let wxmlCompletionItems = [];
            component_1.WxmlSnippets.forEach((item) => {
                if (item.trigger === char) {
                    wxmlCompletionItems.push(item);
                }
            });
            return wxmlCompletionItems.map((item) => {
                let wxmlCompletionItem = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
                wxmlCompletionItem.insertText = item.insertText;
                wxmlCompletionItem.documentation = item.documentation;
                return wxmlCompletionItem;
            });
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
//# sourceMappingURL=miniComponent.js.map