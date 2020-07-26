"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const vscode_1 = require("vscode");
const styleRegexp = /\.[a-zA-Z][\w-\d_]*/g;
const styleWithDocRegexp = /\/\*([\s\S]*?)\*\/[\s\r\n]*[^\.\{\}]*\.([a-zA-Z][\w-\d_]*)/g;
const styleSingleCommentRegexp = /\/\/.*/g;
const styleMultipleCommentRegExp = /\/\*[\s\S]*?\*\//g;
const startStarRegexp = /^\s*\*+ ?/gm;
const fileCache = {};
/** 全局匹配 */
function match(content, regexp) {
    let mat;
    let res = [];
    // tslint:disable:no-conditional-assignment
    while ((mat = regexp.exec(content))) {
        res.push(mat);
    }
    return res;
}
exports.match = match;
/** 根据文件内容和位置，获取 vscode 的 Position 对象 */
function getPositionFromIndex(content, index) {
    let text = content.substring(0, index);
    let lines = text.split(/\r?\n/);
    let line = lines.length - 1;
    return new vscode_1.Position(line, lines[line].length);
}
exports.getPositionFromIndex = getPositionFromIndex;
function replacer(raw) {
    return " ".repeat(raw.length);
}
function parseDoc(doc) {
    return doc.replace(startStarRegexp, "").trim();
}
const quickParseStyle = (styleContent, { unique } = {}) => {
    let style = [];
    let content = styleContent
        .replace(styleSingleCommentRegexp, replacer) // 去除单行注释
        .replace(styleMultipleCommentRegExp, replacer); // 去除多行注释
    match(content, styleRegexp).forEach((mat) => {
        const name = mat[0].substr(1);
        if (!unique || !style.find((s) => s.name === name)) {
            style.push({
                doc: "",
                pos: getPositionFromIndex(content, mat.index),
                name,
            });
        }
    });
    // 再来获取带文档的 className
    styleContent.replace(styleWithDocRegexp, (raw, doc, name) => {
        style.forEach((s) => {
            if (s.name === name) {
                s.doc = parseDoc(doc);
            }
            return s.name === name;
        });
        return "";
    });
    return style;
};
/**
 * 解析样式文件
 */
exports.parseStyleFile = (file) => {
    try {
        let cache = fileCache[file];
        let editor = vscode_1.window.visibleTextEditors.find((e) => e.document.fileName === file);
        if (editor) {
            let content = editor.document.getText();
            return {
                file,
                styles: quickParseStyle(content),
            };
        }
        else {
            const stat = fs.statSync(file);
            if (cache && stat.mtime <= cache.mtime) {
                return cache.value;
            }
            cache = {
                mtime: stat.mtime,
                value: {
                    file,
                    styles: quickParseStyle(fs.readFileSync(file).toString()),
                },
            };
            fileCache[file] = cache;
            return cache.value;
        }
    }
    catch (e) {
        return {
            file,
            styles: [],
        };
    }
};
//# sourceMappingURL=wxssHelper.js.map