"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
exports.getLastChar = (doc, pos) => {
    return doc.getText(new vscode_1.Range(new vscode_1.Position(pos.line, pos.character - 1), pos));
};
//# sourceMappingURL=helper.js.map