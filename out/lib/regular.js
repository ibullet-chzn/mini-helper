"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 匹配标签名(不包括自定义组件)
 */
exports.REGEXP_TAG_NAME = /^<([\w-]+)/;
/**
 * 全量匹配标签属性
 */
exports.REGEXP_TAG_ATTR = /([\w-:.]+)\s*(=\s*("[^"]*"|'[^']*'))?\s*/;
/**
 * 匹配正在输入的标签属性
 */
exports.REGEXP_TAG_ATTR_INPUT = /\b[\w-:.]+$/;
//# sourceMappingURL=regular.js.map