"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
exports.config = {
    wxssGlobalPath: [],
};
exports.getConfig = () => {
    const minapp = vscode_1.workspace.getConfiguration("miniHelper");
    exports.config.wxssGlobalPath = minapp.get("wxssGlobalPath", []);
    return minapp;
};
//# sourceMappingURL=config.js.map