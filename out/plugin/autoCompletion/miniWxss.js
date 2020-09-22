"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
const config_1 = require("../../lib/config");
const helper_1 = require("../../lib/helper");
const wxmlHelper_1 = require("../../lib/wxmlHelper");
const wxssHelper_1 = require("../../lib/wxssHelper");
function default_1(context) {
    // 根据微信文档 获取需要自动提示的字符
    let disposable = vscode_1.languages.registerCompletionItemProvider("wxml", {
        provideCompletionItems,
        resolveCompletionItem,
    }, " ", "\n");
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
    // 解析用户输入的标签内容
    const wxmlTag = wxmlHelper_1.getWxmlTag(document, position);
    if (wxmlTag) {
        const { onAttrValue, attrName } = wxmlTag;
        if (onAttrValue && attrName === "class") {
            if (inputCharacter === " " ||
                (inputCharacter >= "a" && inputCharacter <= "z") ||
                (inputCharacter >= "A" && inputCharacter <= "Z")) {
                const { wxssGlobalPath } = config_1.getConfig();
                let exts = ["wxss"];
                let dir = path.dirname(document.fileName);
                let basename = path.basename(document.fileName, path.extname(document.fileName));
                let localFile = exts
                    .map((e) => path.join(dir, basename + "." + e))
                    .find((f) => fs.existsSync(f));
                let wf = vscode_1.workspace.getWorkspaceFolder(document.uri);
                let globalStyle = [];
                if (wf) {
                    let files = wxssGlobalPath.map((f) => wf && path.resolve(wf.uri.fsPath, f));
                    globalStyle = files.map((file) => {
                        return file ? wxssHelper_1.parseStyleFile(file) : [];
                    });
                }
                if (localFile) {
                    let r = [];
                    [...[wxssHelper_1.parseStyleFile(localFile)], ...globalStyle].forEach((item) => {
                        r.push(...item.styles.map((style) => {
                            return new vscode_1.CompletionItem(style.name, vscode_1.CompletionItemKind.Field);
                        }));
                    });
                    return [...r];
                }
            }
        }
    }
    return [];
}
/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item, token) {
    return null;
}
//# sourceMappingURL=miniWxss.js.map