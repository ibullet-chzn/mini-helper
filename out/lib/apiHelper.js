"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const api_1 = require("../mini/api");
/**
 * 获取输入环境
 */
exports.getWxInput = (doc, pos) => {
    /**
     * 处理正在输入的词
     * 1 利用vs code提供的api
     * 2 解析光标前的单词(以空格分割)
     */
    const vsInputWord = doc.getWordRangeAtPosition(pos, /\b[\w.]+$/);
    return {
        input: doc.getText(vsInputWord),
    };
};
/**
 * 匹配内置函数
 */
exports.searchBuiltInFunctions = () => {
    let globalBuiltInFunctions = [];
    api_1.BuiltInFunctions.forEach((item) => {
        globalBuiltInFunctions.push(item);
    });
    return globalBuiltInFunctions.map((item) => {
        let globalBuiltInFunction = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        if (item.command) {
            globalBuiltInFunction.command = item.command;
        }
        globalBuiltInFunction.insertText = item.insertText;
        globalBuiltInFunction.documentation = item.documentation;
        return globalBuiltInFunction;
    });
};
/**
 * 匹配微信api
 */
exports.searchWxApis = (wxInput) => {
    const { input } = wxInput;
    if (input === "wx.") {
        let globalWxApis = [];
        api_1.WxApis.forEach((item) => {
            globalWxApis.push(item);
        });
        return globalWxApis.map((item) => {
            let globalWxApi = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
            globalWxApi.insertText = item.insertText;
            globalWxApi.documentation = item.documentation;
            return globalWxApi;
        });
    }
    return [];
};
//# sourceMappingURL=apiHelper.js.map