"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function default_1(context) {
    let hover = vscode.languages.registerHoverProvider("json", {
        provideHover,
    });
    // 注册鼠标悬停提示
    context.subscriptions.push(hover);
}
exports.default = default_1;
/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 自动显示对应包的名称、版本号和许可协议
 * @param {*} document
 * @param {*} position
 * @param {*} token
 */
function provideHover(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    if (/\/package\.json$/.test(fileName)) {
        const json = document.getText();
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, "\\/")}[\\s\\S]*?\\}`, "gm").test(json)) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, "")}/package.json`;
            if (fs.existsSync(destPath)) {
                const content = require(destPath);
                // hover内容支持markdown语法
                return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
            }
        }
    }
}
//# sourceMappingURL=hover.js.map