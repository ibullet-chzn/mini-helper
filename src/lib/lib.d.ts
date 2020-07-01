export namespace MiniHelper {
  // 匹配到的属性
  export type Attributes = Array<RegExpExecArray>;

  export interface WxmlTag {
    name: string;
    attribute: MiniHelper.Attributes;
    input: string;
    onAttrValue: boolean;
    attrName: string;
  }

  export interface WxInput {
    input: string;
  }
}
