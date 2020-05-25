"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const helper_1 = require("../../lib/helper");
const wxmlHelper_1 = require("../../lib/wxmlHelper");
function default_1(context) {
    // 根据微信文档 获取需要自动提示的字符
    let disposable = vscode_1.languages.registerCompletionItemProvider("wxml", {
        provideCompletionItems,
        resolveCompletionItem,
    }, " ", ":", "\n");
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
    let inputCharacter = context.triggerCharacter || helper_1.getLastChar(document, position);
    console.log(inputCharacter);
    // 解析用户输入的标签内容
    const wxmlTag = wxmlHelper_1.getWxmlTag(document, position);
    switch (inputCharacter) {
        case ":":
            if (wxmlTag) {
                return [
                    ...wxmlHelper_1.searchWxmlAttributes(wxmlTag),
                    ...wxmlHelper_1.searchBubblingEvents(wxmlTag),
                ];
            }
        case " ":
            if (wxmlTag) {
                return [
                    ...wxmlHelper_1.searchCommonAttributes(wxmlTag),
                    ...wxmlHelper_1.searchWxmlTagAttribute(wxmlTag),
                    ...wxmlHelper_1.searchBindingEvents(),
                ];
            }
        default:
            if (inputCharacter >= "a" && inputCharacter <= "z") {
                if (!wxmlTag) {
                    return wxmlHelper_1.searchWxmlTagName(inputCharacter);
                }
                return [
                    ...wxmlHelper_1.searchCommonAttributes(wxmlTag),
                    ...wxmlHelper_1.searchWxmlTagAttribute(wxmlTag),
                    ...wxmlHelper_1.searchBindingEvents(),
                ];
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
//# sourceMappingURL=miniComponent.js.map