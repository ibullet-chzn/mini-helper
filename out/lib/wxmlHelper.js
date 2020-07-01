"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const commond_1 = require("../vs/commond");
const regular_1 = require("../lib/regular");
const component_1 = require("../mini/component");
/**
 * 备用数据
 */
const BindingEventsArray = component_1.BindingEvents.map((item) => item.label);
/**
 * 参考 https://github.com/wx-minapp/minapp-vscode/tree/master/src/plugin/getTagAtPosition
 */
/**
 * 解析'光标'所属的标签的起止位置
 * 解析其他可能需要的属性
 */
exports.getBracketRange = (doc, pos) => {
    const text = doc.getText();
    const offset = doc.offsetAt(pos);
    const textBeforePos = text.substr(0, offset);
    // 1 找 < 起始标签
    const startBracket = textBeforePos.lastIndexOf("<");
    if (startBracket < 0 || // 前没有开始符<，
        textBeforePos[startBracket + 1] === "!" || // 或者正在注释中： <!-- | -->
        textBeforePos.lastIndexOf(">") > startBracket // 或者不在标签中： <view > | </view>
    ) {
        return null;
    }
    // 2 找 > 结束标签
    let endBracket = text.indexOf(">", offset);
    // 未找到闭合 > 文件结束位置为结束
    if (endBracket < 0) {
        endBracket = text.length;
    }
    // 可能尚未输入闭合标签，取下一个标签的头<
    // 此时找到的闭合标签是下一个标签
    // <view xxx | ... <view ></view>
    const nextStart = text.indexOf("<", offset + 1);
    if (nextStart > 0 && nextStart < endBracket) {
        endBracket = nextStart;
    }
    return {
        start: startBracket,
        end: endBracket,
        length: endBracket - startBracket,
        tagOffset: offset - startBracket,
    };
};
/**
 * 生成指定字符的替换函数
 */
exports.replacer = (char) => (raw) => char.repeat(raw.length);
/**
 * 解析用户输入的标签内容
 */
exports.getWxmlTag = (doc, pos) => {
    const range = exports.getBracketRange(doc, pos);
    if (!range) {
        return null;
    }
    const { start, length, tagOffset } = range;
    const text = doc.getText();
    // 因为双大括号里可能会有任何字符，估优先处理
    // 用特殊字符替换 "{{" 与 "}}"" 之间的语句，并保证字符数一致
    let pureText = text.replace(/\{\{[^\}]*?\}\}/g, exports.replacer("^"));
    let attrFlagText = pureText.replace(/("[^"]*"|'[^']*')/g, exports.replacer("%")); // 将引号中的内容也替换了
    attrFlagText = attrFlagText.substr(start, length);
    const tagNameMatcher = attrFlagText.match(regular_1.REGEXP_TAG_NAME);
    if (!tagNameMatcher) {
        return null;
    }
    const name = tagNameMatcher[1]; // 标签名称
    const tagText = text.substr(start, length);
    const attrstr = tagText.substr(tagNameMatcher[0].length); // 属性部分原始字符串
    const onAttrValue = attrFlagText[tagOffset] === "%";
    const regAttrName = attrFlagText
        .substring(0, tagOffset)
        .match(new RegExp(regular_1.REGEXP_TAG_ATTR_NAME));
    const attrName = regAttrName ? regAttrName[1] : ""; // 当前输入对应的属性
    const r = new RegExp(regular_1.REGEXP_TAG_ATTR, "g");
    let result = 0;
    let attribute = [];
    while ((result = r.exec(attrstr)) !== null) {
        // 轮训找到所有的属性 [0]完整内容 [1]属性名 [2]= [3]"属性值"
        attribute.push(result);
    }
    /**
     * 处理正在输入的词
     * 1 利用vs code提供的api
     * 2 解析光标前的单词(以空格分割)
     */
    const vsInputWord = doc.getWordRangeAtPosition(pos, /\b[\w-:.]+\b/);
    const regInputWord = tagText
        .substr(0, tagOffset)
        .match(new RegExp(regular_1.REGEXP_TAG_ATTR_INPUT));
    const input = vsInputWord
        ? doc.getText(vsInputWord)
        : regInputWord
            ? regInputWord[0]
            : "";
    return {
        name,
        attribute,
        input,
        onAttrValue,
        attrName,
    };
};
/**
 * 属性去重复
 * 兼容 : 的场景
 */
exports.removeDuplicateAttribute = (wxmlTag, attribute) => {
    if (wxmlTag.attribute
        .map((item) => {
        const colonIndex = item[1].indexOf(":");
        return colonIndex !== -1 ? item[1].substring(colonIndex + 1) : item[1];
    })
        .indexOf(attribute.label) === -1) {
        return attribute;
    }
    return false;
};
/**
 * 匹配标签名
 */
exports.searchWxmlTagName = (inputCharacter) => {
    let wxmlCompletionItems = [];
    component_1.WxmlSnippets.forEach((item) => {
        wxmlCompletionItems.push(item);
    });
    return wxmlCompletionItems.map((item) => {
        let wxmlCompletionItem = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        wxmlCompletionItem.command = commond_1.triggerSuggest;
        wxmlCompletionItem.insertText = item.insertText;
        wxmlCompletionItem.documentation = item.documentation;
        return wxmlCompletionItem;
    });
};
/**
 * 匹配属性名
 */
exports.searchWxmlTagAttribute = (wxmlTag) => {
    let wxmlAttributesItems = [];
    component_1.WxmlSnippets.forEach((item) => {
        var _a;
        // 匹配对应的标签名
        if (item.label === wxmlTag.name) {
            // 已有属性-匹配
            if (wxmlTag.attribute.length > 0) {
                (_a = item.attribute) === null || _a === void 0 ? void 0 : _a.forEach((attribute) => {
                    const IAttribute = exports.removeDuplicateAttribute(wxmlTag, attribute);
                    if (attribute) {
                        wxmlAttributesItems === null || wxmlAttributesItems === void 0 ? void 0 : wxmlAttributesItems.push(IAttribute);
                    }
                });
            }
            else {
                // 无属性直接全量返回
                wxmlAttributesItems = item.attribute;
            }
        }
    });
    return wxmlAttributesItems.map((item) => {
        let wxmlAttributesItem = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        wxmlAttributesItem.insertText = item.insertText;
        wxmlAttributesItem.documentation = item.documentation;
        return wxmlAttributesItem;
    });
};
/**
 * 事件绑定
 */
exports.searchBindingEvents = () => {
    return component_1.BindingEvents.map((item) => {
        let wxmlBindingEvent = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        wxmlBindingEvent.command = commond_1.triggerSuggest;
        return wxmlBindingEvent;
    });
};
/**
 * 冒泡事件
 * todo: 区别微信内置属性 并去重
 */
exports.searchBubblingEvents = (wxmlTag) => {
    console.log(wxmlTag);
    if (BindingEventsArray.indexOf(wxmlTag.input) === -1) {
        return [];
    }
    let wxmlBubblingEventsItems = [];
    component_1.BubblingEvents.forEach((item) => {
        const attribute = exports.removeDuplicateAttribute(wxmlTag, item);
        if (attribute) {
            wxmlBubblingEventsItems.push(attribute);
        }
    });
    return wxmlBubblingEventsItems.map((item) => {
        let wxmlBubblingEventsItem = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        wxmlBubblingEventsItem.insertText = item.insertText;
        return wxmlBubblingEventsItem;
    });
};
/**
 * 通用属性
 */
exports.searchCommonAttributes = (wxmlTag) => {
    let commonAttributesItems = [];
    component_1.Attributes.forEach((item) => {
        const attribute = exports.removeDuplicateAttribute(wxmlTag, item);
        if (attribute) {
            commonAttributesItems.push(attribute);
        }
    });
    return commonAttributesItems.map((item) => {
        let commonAttributesItem = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        if (item.command) {
            commonAttributesItem.command = item.command;
        }
        commonAttributesItem.insertText = item.insertText;
        return commonAttributesItem;
    });
};
/**
 * wxml属性
 * todo: 区别绑定事件
 */
exports.searchWxmlAttributes = (wxmlTag) => {
    if (wxmlTag.input !== "wx:") {
        return [];
    }
    let wxmlAttributesItems = [];
    // wxml属性
    component_1.WxAttributes.forEach((item) => {
        const attribute = exports.removeDuplicateAttribute(wxmlTag, item);
        if (attribute) {
            wxmlAttributesItems.push(attribute);
        }
    });
    // wx:for 相关属性
    if (wxmlTag.attribute.map((item) => item[1]).indexOf("wx:for") !== -1) {
        component_1.WxForAttributes.forEach((item) => {
            const attribute = exports.removeDuplicateAttribute(wxmlTag, item);
            if (attribute) {
                wxmlAttributesItems.push(attribute);
            }
        });
    }
    return wxmlAttributesItems.map((item) => {
        let wxmlAttributesItem = new vscode_1.CompletionItem(item.label, vscode_1.CompletionItemKind.Field);
        wxmlAttributesItem.insertText = item.insertText;
        return wxmlAttributesItem;
    });
};
//# sourceMappingURL=wxmlHelper.js.map