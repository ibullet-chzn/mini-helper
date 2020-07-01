"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloworld_1 = require("./helloworld");
const jump_1 = require("./jump");
const miniApi_1 = require("./plugin/autoCompletion/miniApi");
const miniComponent_1 = require("./plugin/autoCompletion/miniComponent");
const miniWxss_1 = require("./plugin/autoCompletion/miniWxss");
const hover_1 = require("./hover");
function activate(context) {
    console.log("mini-helper 启动了");
    helloworld_1.default(context);
    jump_1.default(context);
    miniApi_1.default(context);
    miniComponent_1.default(context);
    miniWxss_1.default(context);
    hover_1.default(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map