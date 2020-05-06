"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 匹配小程序标签名(不包括自定义组件)
 */
exports.REGEXP_TAG_NAME = /^<([\w-]+)/;
/**
 * 匹配小程序的标签属性
 */
exports.REGEXP_TAG_ATTR = /([\w-:.]+)\s*(=\s*("[^"]*"|'[^']*'))?\s*/;
//# sourceMappingURL=regular.js.map