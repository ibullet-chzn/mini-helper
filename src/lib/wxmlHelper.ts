import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import { MiniHelper } from "./lib";
import { triggerSuggest } from "../vs/commond";
import { Mini } from "../mini/mini";
import {
  REGEXP_TAG_NAME,
  REGEXP_TAG_ATTR,
  REGEXP_TAG_ATTR_INPUT,
} from "../lib/regular";
import {
  BindingEvents,
  BindingEvent,
  BubblingEvents,
  BubblingEvent,
  Attributes,
  Attribute,
  WxAttributes,
  WxForAttributes,
  WxmlSnippets,
  WxmlSnippet,
} from "../mini/component";

/**
 * 备用数据
 */

const BindingEventsArray = BindingEvents.map((item) => item.label);

/**
 * 参考 https://github.com/wx-minapp/minapp-vscode/tree/master/src/plugin/getTagAtPosition
 */

/**
 * 解析'光标'所属的标签的起止位置
 * 解析其他可能需要的属性
 */
export const getBracketRange = (doc: TextDocument, pos: Position) => {
  const text = doc.getText();
  const offset = doc.offsetAt(pos);
  const textBeforePos = text.substr(0, offset);
  // 1 找 < 起始标签
  const startBracket = textBeforePos.lastIndexOf("<");
  if (
    startBracket < 0 || // 前没有开始符<，
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
export const replacer = (char: string) => (raw: string) =>
  char.repeat(raw.length);

/**
 * 解析用户输入的标签内容
 */
export const getWxmlTag = (
  doc: TextDocument,
  pos: Position
): MiniHelper.WxmlTag | null => {
  const range = getBracketRange(doc, pos);
  if (!range) {
    return null;
  }
  const { start, length, tagOffset } = range;
  const text = doc.getText();

  // 因为双大括号里可能会有任何字符，估优先处理
  // 用特殊字符替换 "{{" 与 "}}"" 之间的语句，并保证字符数一致
  let pureText = text.replace(/\{\{[^\}]*?\}\}/g, replacer("^"));
  let attrFlagText = pureText.replace(/("[^"]*"|'[^']*')/g, replacer("%")); // 将引号中的内容也替换了
  attrFlagText = attrFlagText.substr(start, length);

  const tagNameMatcher = attrFlagText.match(REGEXP_TAG_NAME);
  if (!tagNameMatcher) {
    return null;
  }
  const name = tagNameMatcher[1]; // 标签名称
  const tagText = text.substr(start, length);
  const attrstr = tagText.substr(tagNameMatcher[0].length); // 属性部分原始字符串
  const r = new RegExp(REGEXP_TAG_ATTR, "g");
  let result: RegExpExecArray | null | number = 0;
  let attribute: MiniHelper.Attributes = [];
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
    .match(new RegExp(REGEXP_TAG_ATTR_INPUT));
  const input = vsInputWord
    ? doc.getText(vsInputWord)
    : regInputWord
    ? regInputWord[0]
    : "";

  return {
    name,
    attribute,
    input,
  };
};

/**
 * 属性去重复
 * 兼容 : 的场景
 */
export const removeDuplicateAttribute = (
  wxmlTag: MiniHelper.WxmlTag,
  attribute: Attribute
): Attribute | boolean => {
  if (
    wxmlTag.attribute
      .map((item) => {
        const colonIndex = item[1].indexOf(":");
        return colonIndex !== -1 ? item[1].substring(colonIndex + 1) : item[1];
      })
      .indexOf(attribute.label) === -1
  ) {
    return attribute;
  }
  return false;
};

/**
 * 匹配标签名
 */
export const searchWxmlTagName = (inputCharacter: string) => {
  let wxmlCompletionItems: WxmlSnippet[] = [];
  WxmlSnippets.forEach((item: WxmlSnippet) => {
    wxmlCompletionItems.push(item);
  });
  return wxmlCompletionItems.map((item: WxmlSnippet) => {
    let wxmlCompletionItem = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
    wxmlCompletionItem.command = triggerSuggest;
    wxmlCompletionItem.insertText = item.insertText;
    wxmlCompletionItem.documentation = item.documentation;
    return wxmlCompletionItem;
  });
};

/**
 * 匹配属性名
 */
export const searchWxmlTagAttribute = (wxmlTag: MiniHelper.WxmlTag) => {
  let wxmlAttributesItems: Mini.Attribute[] | undefined = [];
  WxmlSnippets.forEach((item: WxmlSnippet) => {
    // 匹配对应的标签名
    if (item.label === wxmlTag.name) {
      // 已有属性-匹配
      if (wxmlTag.attribute.length > 0) {
        item.attribute?.forEach((attribute) => {
          const IAttribute = removeDuplicateAttribute(wxmlTag, attribute);
          if (attribute) {
            wxmlAttributesItems?.push(IAttribute as Attribute);
          }
        });
      } else {
        // 无属性直接全量返回
        wxmlAttributesItems = item.attribute;
      }
    }
  });
  return wxmlAttributesItems.map((item) => {
    let wxmlAttributesItem = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
    wxmlAttributesItem.insertText = item.insertText;
    wxmlAttributesItem.documentation = item.documentation;
    return wxmlAttributesItem;
  });
};

/**
 * 事件绑定
 */
export const searchBindingEvents = () => {
  return BindingEvents.map((item: BindingEvent) => {
    let wxmlBindingEvent = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
    wxmlBindingEvent.command = triggerSuggest;
    return wxmlBindingEvent;
  });
};

/**
 * 冒泡事件
 * todo: 区别微信内置属性 并去重
 */
export const searchBubblingEvents = (wxmlTag: MiniHelper.WxmlTag) => {
  console.log(wxmlTag);
  if (BindingEventsArray.indexOf(wxmlTag.input) === -1) {
    return [];
  }
  let wxmlBubblingEventsItems: BubblingEvent[] = [];
  BubblingEvents.forEach((item: BubblingEvent) => {
    const attribute = removeDuplicateAttribute(wxmlTag, item);
    if (attribute) {
      wxmlBubblingEventsItems.push(attribute as Attribute);
    }
  });
  return wxmlBubblingEventsItems.map((item: BubblingEvent) => {
    let wxmlBubblingEventsItem = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
    wxmlBubblingEventsItem.insertText = item.insertText;
    return wxmlBubblingEventsItem;
  });
};

/**
 * 通用属性
 */
export const searchCommonAttributes = (wxmlTag: MiniHelper.WxmlTag) => {
  let commonAttributesItems: Attribute[] = [];
  Attributes.forEach((item: Attribute) => {
    const attribute = removeDuplicateAttribute(wxmlTag, item);
    if (attribute) {
      commonAttributesItems.push(attribute as Attribute);
    }
  });
  return commonAttributesItems.map((item: Attribute) => {
    let commonAttributesItem = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
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
export const searchWxmlAttributes = (wxmlTag: MiniHelper.WxmlTag) => {
  if (wxmlTag.input !== "wx:") {
    return [];
  }
  let wxmlAttributesItems: Attribute[] = [];
  // wxml属性
  WxAttributes.forEach((item: Attribute) => {
    const attribute = removeDuplicateAttribute(wxmlTag, item);
    if (attribute) {
      wxmlAttributesItems.push(attribute as Attribute);
    }
  });
  // wx:for 相关属性
  if (wxmlTag.attribute.map((item) => item[1]).indexOf("wx:for") !== -1) {
    WxForAttributes.forEach((item: Attribute) => {
      const attribute = removeDuplicateAttribute(wxmlTag, item);
      if (attribute) {
        wxmlAttributesItems.push(attribute as Attribute);
      }
    });
  }
  return wxmlAttributesItems.map((item: BubblingEvent) => {
    let wxmlAttributesItem = new CompletionItem(
      item.label,
      CompletionItemKind.Field
    );
    wxmlAttributesItem.insertText = item.insertText;
    return wxmlAttributesItem;
  });
};
