/**
 * 匹配标签名(不包括自定义组件)
 */
export const REGEXP_TAG_NAME = /^<([\w-]+)/;
/**
 * 全量匹配标签属性
 */
export const REGEXP_TAG_ATTR = /([\w-:.]+)\s*(=\s*("[^"]*"|'[^']*'))?\s*/;
/**
 * 匹配正在输入的标签属性
 */
export const REGEXP_TAG_ATTR_INPUT = /\b[\w-:.]+$/;
/**
 * 匹配正在输入的标签名
 */
export const REGEXP_TAG_ATTR_NAME = /\s([\w-:.]+)=%*$/;
