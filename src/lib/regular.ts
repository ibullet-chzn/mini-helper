/**
 * 匹配小程序标签名(不包括自定义组件)
 */
export const REGEXP_TAG_NAME = /^<([\w-]+)/;
/**
 * 匹配小程序的标签属性
 */
export const REGEXP_TAG_ATTR = /([\w-:.]+)\s*(=\s*("[^"]*"|'[^']*'))?\s*/;
