"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloworld_1 = require("./helloworld");
const jump_1 = require("./jump");
const completion_1 = require("./completion");
function activate(context) {
    helloworld_1.default(context);
    jump_1.default(context);
    completion_1.default(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map