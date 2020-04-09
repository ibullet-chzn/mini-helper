import { TextDocument, Position } from "vscode";
import { REGEXP_TAG_ATTR } from "../lib/regular";

/**
 * 参考 https://github.com/wx-minapp/minapp-vscode/tree/master/src/plugin/getTagAtPosition
 */

/**
 * 解析'光标'所属的标签数据
 */
export const getBracketRange = (
  doc: TextDocument,
  pos: Position
): [number, number] | null => {
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
  let endBracket = text.indexOf(">", offset + 1);
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
  return [startBracket, endBracket - startBracket];
};

/**
 * 生成指定字符的替换函数
 */
export const replacer = (char: string) => (raw: string) =>
  char.repeat(raw.length);

export const getWxmlTag = (doc: TextDocument, pos: Position) => {
  const range = getBracketRange(doc, pos);
  if (!range) {
    return null;
  }
  const [start, length] = range;
  const text = doc.getText();

  // 因为双大括号里可能会有任何字符，估优先处理
  // 用特殊字符替换 "{{" 与 "}}"" 之间的语句，并保证字符数一致
  let pureText = text.replace(/\{\{[^\}]*?\}\}/g, replacer("^"));
  let attrFlagText = pureText.replace(/("[^"]*"|'[^']*')/g, replacer("%")); // 将引号中的内容也替换了
  attrFlagText = attrFlagText.substr(start, length);

  const tagNameMatcher = attrFlagText.match(/^<([\w-:.]+)/);
  if (!tagNameMatcher) {
    return null;
  }
  const name = tagNameMatcher[1]; // 标签名称
  const tagText = text.substr(start, length);
  const t = 'bindscroll="" class="" scrolltop=""';
  const r = new RegExp(REGEXP_TAG_ATTR, "g");
  let result: RegExpExecArray | null | number = 0;
  while (result !== null) {
    result = r.exec(t);
    console.log(result);
  }

  const inputWordRange = doc.getWordRangeAtPosition(pos, /\b[\w-:.]+\b/);
  const posWord = inputWordRange ? doc.getText(inputWordRange) : ""; // 正在输入的词
  return {
    name,
    posWord,
  };
};
