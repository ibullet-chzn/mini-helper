"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const api_1 = require("../mini/api");
const regular_1 = require("../lib/regular");
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
 * 匹配api范围
 */
exports.getBracketRange = (doc, pos) => {
    const text = doc.getText();
    const offset = doc.offsetAt(pos);
    const textBeforePos = text.substr(0, offset);
    // 1 找 ( 起始括号
    const startBracket = textBeforePos.lastIndexOf("(");
    if (startBracket < 0 || // 前没有开始符(
        textBeforePos.lastIndexOf(")") > startBracket // 或者不在api中
    ) {
        return null;
    }
    // 2 找 ) 结束标签
    let endBracket = text.indexOf(")", offset);
    // 未找到闭合 > 文件结束位置为结束
    if (endBracket < 0) {
        endBracket = text.length;
    }
    return {
        start: startBracket,
        end: endBracket,
        length: endBracket - startBracket,
        tagOffset: offset - startBracket,
    };
};
/**
 * 获取正在输入的api
 */
exports.getApiTag = (doc, pos) => {
    const range = exports.getBracketRange(doc, pos);
    if (!range) {
        return null;
    }
    const { start, length, tagOffset } = range;
    const text = doc.getText();
    /** 匹配括号前的api名 */
    const RegApiName = text
        .substr(0, start)
        .match(new RegExp(regular_1.REGEXP_LASTBlANK_END));
    if (RegApiName && RegApiName[1]) {
        return {
            name: RegApiName[1],
        };
    }
    return null;
};
/**
 * 匹配内置函数
 */
exports.searchBuiltInFunctions = () => {
    return api_1.BuiltInFunctions.map((item) => {
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
        return api_1.WxApis.map((item) => {
            let globalWxApi = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
            globalWxApi.insertText = item.insertText;
            globalWxApi.documentation = item.documentation;
            globalWxApi.command = item.command;
            return globalWxApi;
        });
    }
    return [];
};
/**
 * 匹配api的参数 解决参数为Object的语法提示
 */
exports.searchWxApiParams = (ApiTags) => {
    const tagLength = ApiTags.length;
    console.log(tagLength);
    if (tagLength === 1) {
        // 匹配内置函数
        let globalBuiltInFunctionParams = [];
        api_1.BuiltInFunctions.forEach((item) => {
            if (ApiTags[0] === item.label) {
                globalBuiltInFunctionParams = item.params || [];
            }
        });
        return globalBuiltInFunctionParams.map((item) => {
            let globalBuiltInFunction = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
            globalBuiltInFunction.insertText = item.insertText;
            globalBuiltInFunction.documentation = item.documentation;
            return globalBuiltInFunction;
        });
    }
    else if (tagLength === 2) {
        // 匹配wx.api
        let globalWxApiParams = [];
        api_1.WxApis.forEach((item) => {
            if (ApiTags[1] === item.label) {
                globalWxApiParams = item.params || [];
            }
        });
        return globalWxApiParams.map((item) => {
            let globalWxApi = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
            globalWxApi.insertText = item.insertText;
            globalWxApi.documentation = item.documentation;
            return globalWxApi;
        });
    }
    return [];
};
//# sourceMappingURL=apiHelper.js.map