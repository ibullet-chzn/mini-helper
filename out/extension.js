"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloworld_1 = require("./helloworld");
const jump_1 = require("./jump");
const completion_1 = require("./completion");
const hover_1 = require("./hover");
function activate(context) {
    console.log("mini-helper 被激活了");
    helloworld_1.default(context);
    jump_1.default(context);
    completion_1.default(context);
    hover_1.default(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map