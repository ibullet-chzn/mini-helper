"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const commond_1 = require("../vs/commond");
exports.BindingEvents = [
    {
        label: "bind:",
    },
    {
        label: "catch:",
        documentation: "与 bind 不同，catch 会阻止事件向上冒泡",
    },
    {
        label: "mut-bind:",
        version: "2.8.2",
        documentation: "所有 mut-bind 是“互斥”的，只会有其中一个绑定函数被触发。同时，它完全不影响 bind 和 catch 的绑定效果",
    },
    {
        label: "capture-bind:",
        version: "1.5.0",
        documentation: "触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。",
    },
    {
        label: "capture-catch:",
        version: "1.5.0",
        documentation: "触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。",
    },
];
exports.BubblingEvents = [
    {
        label: "touchstart",
        insertText: new vscode_1.SnippetString('touchstart="${0}"'),
    },
    {
        label: "touchmove",
        insertText: new vscode_1.SnippetString('touchmove="${0}"'),
    },
    {
        label: "touchcancel",
        insertText: new vscode_1.SnippetString('touchcancel="${0}"'),
    },
    {
        label: "touchend",
        insertText: new vscode_1.SnippetString('touchend="${0}"'),
    },
    {
        label: "tap",
        insertText: new vscode_1.SnippetString('tap="${0}"'),
    },
    {
        label: "longpress",
        insertText: new vscode_1.SnippetString('longpress="${0}"'),
    },
    {
        label: "longtap",
        insertText: new vscode_1.SnippetString('longtap="${0}"'),
    },
    {
        label: "transitionend",
        insertText: new vscode_1.SnippetString('transitionend="${0}"'),
    },
    {
        label: "animationstart",
        insertText: new vscode_1.SnippetString('animationstart="${0}"'),
    },
    {
        label: "animationiteration",
        insertText: new vscode_1.SnippetString('animationiteration="${0}"'),
    },
    {
        label: "animationend",
        insertText: new vscode_1.SnippetString('animationend="${0}"'),
    },
    {
        label: "touchforcechange",
        insertText: new vscode_1.SnippetString('touchforcechange="${0}"'),
    },
];
exports.Attributes = [
    {
        label: "id",
        insertText: new vscode_1.SnippetString('id="${0}"'),
    },
    {
        label: "class",
        insertText: new vscode_1.SnippetString('class="${0}"'),
    },
    {
        label: "style",
        insertText: new vscode_1.SnippetString('style="${0}"'),
    },
    {
        label: "hidden",
        insertText: new vscode_1.SnippetString('hidden="${0}"'),
    },
    {
        label: "wx:",
        command: commond_1.triggerSuggest,
    },
];
/** 无障碍访问 */
exports.AriaAttributes = [
    {
        label: "aria-hidden",
        insertText: new vscode_1.SnippetString('aria-hidden="${0}"'),
    },
    {
        label: "aria-role",
        insertText: new vscode_1.SnippetString('aria-role="${0}"'),
    },
    {
        label: "aria-label",
        insertText: new vscode_1.SnippetString('aria-label="${0}"'),
    },
    {
        label: "aria-checked",
        insertText: new vscode_1.SnippetString('aria-checked="${0}"'),
    },
    {
        label: "aria-disabled",
        insertText: new vscode_1.SnippetString('aria-disabled="${0}"'),
    },
    {
        label: "aria-describedby",
        insertText: new vscode_1.SnippetString('aria-describedby="${0}"'),
    },
    {
        label: "aria-expanded",
        insertText: new vscode_1.SnippetString('aria-expanded="${0}"'),
    },
    {
        label: "aria-haspopup",
        insertText: new vscode_1.SnippetString('aria-haspopup="${0}"'),
    },
    {
        label: "aria-selected",
        insertText: new vscode_1.SnippetString('aria-selected="${0}"'),
    },
    {
        label: "aria-required",
        insertText: new vscode_1.SnippetString('aria-required="${0}"'),
    },
    {
        label: "aria-orientation",
        insertText: new vscode_1.SnippetString('aria-orientation="${0}"'),
    },
    {
        label: "aria-valuemin",
        insertText: new vscode_1.SnippetString('aria-valuemin="${0}"'),
    },
    {
        label: "aria-valuemax",
        insertText: new vscode_1.SnippetString('aria-valuemax="${0}"'),
    },
    {
        label: "aria-valuenow",
        insertText: new vscode_1.SnippetString('aria-valuenow="${0}"'),
    },
    {
        label: "aria-readonly",
        insertText: new vscode_1.SnippetString('aria-readonly="${0}"'),
    },
    {
        label: "aria-multiselectable",
        insertText: new vscode_1.SnippetString('aria-multiselectable="${0}"'),
    },
    {
        label: "aria-controls",
        insertText: new vscode_1.SnippetString('aria-controls="${0}"'),
    },
    {
        label: "tabindex",
        insertText: new vscode_1.SnippetString('tabindex="${0}"'),
    },
    {
        label: "aria-labelledby",
        insertText: new vscode_1.SnippetString('aria-labelledby="${0}"'),
    },
    {
        label: "aria-orientation",
        insertText: new vscode_1.SnippetString('aria-orientation="${0}"'),
    },
    {
        label: "aria-multiselectable",
        insertText: new vscode_1.SnippetString('aria-multiselectable="${0}"'),
    },
    {
        label: "aria-labelledby",
        insertText: new vscode_1.SnippetString('aria-labelledby="${0}"'),
    },
];
exports.WxAttributes = [
    {
        label: "if",
        insertText: new vscode_1.SnippetString('if="${0}"'),
    },
    {
        label: "elif",
        insertText: new vscode_1.SnippetString('elif="${0}"'),
    },
    {
        label: "else",
        insertText: new vscode_1.SnippetString('else="${0}"'),
    },
    {
        label: "for",
        insertText: new vscode_1.SnippetString('for="{{${0}}}"'),
    },
];
exports.WxForAttributes = [
    {
        label: "key",
        insertText: new vscode_1.SnippetString('key="${0}"'),
    },
    {
        label: "for-item",
        insertText: new vscode_1.SnippetString('for-item="${0}"'),
    },
    {
        label: "for-index",
        insertText: new vscode_1.SnippetString('for-index="${0}"'),
    },
];
exports.WxmlSnippets = [
    {
        label: "view",
        attribute: [
            {
                label: "hover-class",
                type: "string",
                default: "none",
                required: false,
                documentation: "指定按下去的样式类。当 hover-class='none' 时，没有点击态效果",
                insertText: new vscode_1.SnippetString('hover-class="none"'),
            },
            {
                label: "hover-stop-propagation",
                type: "boolean",
                default: "false",
                required: false,
                version: "1.5.0",
                documentation: "指定是否阻止本节点的祖先节点出现点击态",
                insertText: new vscode_1.SnippetString('hover-stop-propagation="false"'),
            },
            {
                label: "hover-start-time",
                type: "number",
                default: "50",
                required: false,
                documentation: "按住后多久出现点击态，单位毫秒",
                insertText: new vscode_1.SnippetString('hover-start-time="50"'),
            },
            {
                label: "hover-stay-time",
                type: "number",
                default: "400",
                required: false,
                documentation: "手指松开后点击态保留时间，单位毫秒",
                insertText: new vscode_1.SnippetString('hover-stay-time="400"'),
            },
        ],
        insertText: new vscode_1.SnippetString("<view $1>$0</view>"),
        documentation: new vscode_1.MarkdownString("### 视图容器"),
    },
    {
        label: "cover-view",
        attribute: [
            {
                label: "scroll-top",
                type: "number/string",
                default: "",
                required: false,
                version: "2.1.0",
                documentation: "设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效",
                insertText: new vscode_1.SnippetString('scroll-top="$0"'),
            },
        ],
        insertText: new vscode_1.SnippetString("<cover-view $1>$0</cover-view>"),
        documentation: new vscode_1.MarkdownString("### 覆盖在原生组件之上的文本视图"),
    },
    {
        label: "cover-image",
        attribute: [
            {
                label: "src",
                type: "string",
                default: "",
                required: false,
                version: "1.4.0",
                documentation: "图标路径，支持临时路径、网络地址（1.6.0起支持）、云文件ID（2.2.3起支持）",
                insertText: new vscode_1.SnippetString('src="$0"'),
            },
            {
                label: "bindload",
                type: "eventhandle",
                default: "",
                required: false,
                version: "2.1.0",
                documentation: "图片加载成功时触发",
                insertText: new vscode_1.SnippetString('src="$0"'),
            },
            {
                label: "binderror",
                type: "eventhandle",
                default: "",
                required: false,
                version: "2.1.0",
                documentation: "图片加载失败时触发",
                insertText: new vscode_1.SnippetString('src="$0"'),
            },
        ],
        insertText: new vscode_1.SnippetString("<cover-image $1>$0</cover-image>"),
        documentation: new vscode_1.MarkdownString("### 覆盖在原生组件之上的图片视图。可覆盖的原生组件同cover-view，支持嵌套在cover-view里。"),
    },
    {
        label: "scroll-view",
        attribute: [
            {
                label: "scroll-x",
                type: "boolean",
                default: "false",
                required: false,
                documentation: "允许横向滚动",
                insertText: new vscode_1.SnippetString("scroll-x"),
            },
            {
                label: "scroll-y",
                type: "boolean",
                default: "false",
                required: false,
                documentation: "允许纵向滚动",
                insertText: new vscode_1.SnippetString("scroll-y"),
            },
        ],
        insertText: new vscode_1.SnippetString("<cover-view $1>$0</cover-view>"),
        documentation: new vscode_1.MarkdownString("### 覆盖在原生组件之上的文本视图"),
    },
    {
        label: "swiper",
        attribute: [],
        insertText: new vscode_1.SnippetString("<swiper $1>$0</swiper>"),
        documentation: new vscode_1.MarkdownString("### 滑块视图容器。其中只可放置swiper-item组件，否则会导致未定义的行为。"),
    },
    {
        label: "swiper-item",
        attribute: [],
        insertText: new vscode_1.SnippetString("<swiper-item>$0</swiper-item>"),
        documentation: new vscode_1.MarkdownString("### 仅可放置在swiper组件中，宽高自动设置为100%。"),
    },
    {
        label: "match-media",
        attribute: [],
        insertText: new vscode_1.SnippetString("<match-media $1>$0</match-media>"),
        documentation: new vscode_1.MarkdownString("### media query 匹配检测节点。可以指定一组 media query 规则，满足时，这个节点才会被展示。### 通过这个节点可以实现“页面宽高在某个范围时才展示某个区域”这样的效果。"),
    },
    {
        label: "movable-area",
        attribute: [],
        insertText: new vscode_1.SnippetString("<movable-area $1>$0</movable-area>"),
        documentation: new vscode_1.MarkdownString("### movable-view的可移动区域。"),
    },
    {
        label: "movable-view",
        attribute: [],
        insertText: new vscode_1.SnippetString("<movable-view $1>$0</movable-view>"),
        documentation: new vscode_1.MarkdownString("### 可移动的视图容器，在页面中可以拖拽滑动。movable-view必须在 movable-area 组件中，并且必须是直接子节点，否则不能移动。"),
    },
    {
        label: "icon",
        attribute: [],
        insertText: new vscode_1.SnippetString("<icon $1>$0</icon>"),
        documentation: new vscode_1.MarkdownString("### 图标。组件属性的长度单位默认为px，2.4.0起支持传入单位(rpx/px)。"),
    },
    {
        label: "progress",
        attribute: [],
        insertText: new vscode_1.SnippetString("<progress $1>$0</progress>"),
        documentation: new vscode_1.MarkdownString("### 进度条。组件属性的长度单位默认为px，2.4.0起支持传入单位(rpx/px)。"),
    },
    {
        label: "rich-text",
        attribute: [],
        insertText: new vscode_1.SnippetString("<rich-text $1>$0</rich-text>"),
        documentation: new vscode_1.MarkdownString("### 富文本。"),
    },
    {
        label: "text",
        attribute: [],
        insertText: new vscode_1.SnippetString("<text $1>$0</text>"),
        documentation: new vscode_1.MarkdownString("### 文本。"),
    },
    {
        label: "form",
        attribute: [],
        insertText: new vscode_1.SnippetString("<form $1>$0</form>"),
        documentation: new vscode_1.MarkdownString("### 表单。将组件内的用户输入的switch input checkbox slider radio picker 提交。### 当点击 form 表单中 form-type 为 submit 的 button 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。"),
    },
    {
        label: "button",
        attribute: [],
        insertText: new vscode_1.SnippetString("<button $1>$0</button>"),
        documentation: new vscode_1.MarkdownString("### 按钮。"),
    },
    {
        label: "checkbox-group",
        attribute: [],
        insertText: new vscode_1.SnippetString("<checkbox-group $1>$0</checkbox-group>"),
        documentation: new vscode_1.MarkdownString("### 多项选择器，内部由多个checkbox组成。"),
    },
    {
        label: "checkbox",
        attribute: [],
        insertText: new vscode_1.SnippetString("<checkbox $1>$0</checkbox>"),
        documentation: new vscode_1.MarkdownString("### 多选项目。"),
    },
    {
        label: "editor",
        attribute: [],
        insertText: new vscode_1.SnippetString("<editor $1>$0</editor>"),
        documentation: new vscode_1.MarkdownString("### 富文本编辑器，可以对图片、文字进行编辑。"),
    },
    {
        label: "input",
        attribute: [],
        insertText: new vscode_1.SnippetString("<input $0 />"),
        documentation: new vscode_1.MarkdownString("### 输入框。该组件是原生组件，使用时请注意相关限制。"),
    },
    {
        label: "label",
        attribute: [],
        insertText: new vscode_1.SnippetString("<label $1>$0</label>"),
        documentation: new vscode_1.MarkdownString("### 用来改进表单组件的可用性。"),
    },
    {
        label: "picker",
        attribute: [],
        insertText: new vscode_1.SnippetString("<picker $1>$0</picker>"),
        documentation: new vscode_1.MarkdownString("### 从底部弹起的滚动选择器。"),
    },
    {
        label: "picker-view",
        attribute: [],
        insertText: new vscode_1.SnippetString("<picker-view $1>$0</picker-view>"),
        documentation: new vscode_1.MarkdownString("### 嵌入页面的滚动选择器。其中只可放置 picker-view-column组件，其它节点不会显示。"),
    },
    {
        label: "picker-view-column",
        attribute: [],
        insertText: new vscode_1.SnippetString("<picker-view-column>$0</picker-view-column>"),
        documentation: new vscode_1.MarkdownString("### 滚动选择器子项。仅可放置于picker-view中，其孩子节点的高度会自动设置成与picker-view的选中框的高度一致。"),
    },
    {
        label: "radio-group",
        attribute: [],
        insertText: new vscode_1.SnippetString("<radio-group $1>$0</radio-group>"),
        documentation: new vscode_1.MarkdownString("### 单项选择器，内部由多个 radio 组成。"),
    },
    {
        label: "radio",
        attribute: [],
        insertText: new vscode_1.SnippetString("<radio $1>$0</radio>"),
        documentation: new vscode_1.MarkdownString("### 单选项目。"),
    },
    {
        label: "slider",
        attribute: [],
        insertText: new vscode_1.SnippetString("<slider $1>$0</slider>"),
        documentation: new vscode_1.MarkdownString("### 滑动选择器。"),
    },
    {
        label: "switch",
        attribute: [],
        insertText: new vscode_1.SnippetString("<switch $1>$0</switch>"),
        documentation: new vscode_1.MarkdownString("### 开关选择器。"),
    },
    {
        label: "textarea",
        attribute: [],
        insertText: new vscode_1.SnippetString("<textarea $1>$0</textarea>"),
        documentation: new vscode_1.MarkdownString("### 多行输入框。该组件是原生组件，使用时请注意相关限制。"),
    },
    {
        label: "navigator",
        attribute: [],
        insertText: new vscode_1.SnippetString("<navigator $1>$0</navigator>"),
        documentation: new vscode_1.MarkdownString("### 页面链接。"),
    },
    {
        label: "functional-page-navigator",
        attribute: [],
        insertText: new vscode_1.SnippetString("<functional-page-navigator $1>$0</functional-page-navigator>"),
        documentation: new vscode_1.MarkdownString("### 仅在插件中有效，用于跳转到插件功能页。"),
    },
    {
        label: "audio",
        attribute: [],
        insertText: new vscode_1.SnippetString("<audio $1>$0</audio>"),
        documentation: new vscode_1.MarkdownString("### 音频。1.6.0版本开始，该组件不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口。"),
    },
    {
        label: "camera",
        attribute: [],
        insertText: new vscode_1.SnippetString("<camera $1>$0</camera>"),
        documentation: new vscode_1.MarkdownString("### 系统相机。扫码二维码功能，需升级微信客户端至6.7.3。需要用户授权 scope.camera。 2.10.0起 initdone 事件返回 maxZoom，最大变焦范围，相关接口 CameraContext.setZoom。"),
    },
    {
        label: "image",
        attribute: [],
        insertText: new vscode_1.SnippetString("<image $1>$0</image>"),
        documentation: new vscode_1.MarkdownString("### 图片。支持 JPG、PNG、SVG、WEBP、GIF 等格式，2.3.0 起支持云文件ID。"),
    },
    {
        label: "live-player",
        attribute: [],
        insertText: new vscode_1.SnippetString("<live-player $1>$0</live-player>"),
        documentation: new vscode_1.MarkdownString("### 实时音视频播放（v2.9.1 起支持同层渲染）。"),
    },
    {
        label: "live-pusher",
        attribute: [],
        insertText: new vscode_1.SnippetString("<live-pusher $1>$0</live-pusher>"),
        documentation: new vscode_1.MarkdownString("### 实时音视频录制（v2.9.1 起支持同层渲染）。"),
    },
    {
        label: "video",
        attribute: [],
        insertText: new vscode_1.SnippetString("<video $1>$0</video>"),
        documentation: new vscode_1.MarkdownString("### 视频（v2.4.0 起支持同层渲染）。"),
    },
    {
        label: "voip-room",
        attribute: [],
        insertText: new vscode_1.SnippetString("<voip-room $1>$0</voip-room>"),
        documentation: new vscode_1.MarkdownString("### 多人音视频对话。需用户授权 scope.camera、scope.record。"),
    },
    {
        label: "map",
        attribute: [],
        insertText: new vscode_1.SnippetString("<map $1>$0</map>"),
        documentation: new vscode_1.MarkdownString("### 地图（v2.7.0 起支持同层渲染）。"),
    },
    {
        label: "canvas",
        attribute: [],
        insertText: new vscode_1.SnippetString("<canvas $1>$0</canvas>"),
        documentation: new vscode_1.MarkdownString("### 画布。2.9.0 起支持一套新 Canvas 2D 接口（需指定 type 属性），同时支持同层渲染，原有接口不再维护。相关api：获取 canvas 实例。"),
    },
    {
        label: "ad",
        attribute: [],
        insertText: new vscode_1.SnippetString("<ad $1>$0</ad>"),
        documentation: new vscode_1.MarkdownString("### Banner 广告。"),
    },
    {
        label: "ad-custom",
        attribute: [],
        insertText: new vscode_1.SnippetString("<ad-custom $1>$0</ad-custom>"),
        documentation: new vscode_1.MarkdownString("### 原生模板 广告。"),
    },
    {
        label: "official-account",
        attribute: [],
        insertText: new vscode_1.SnippetString("<official-account $1>$0</official-account>"),
        documentation: new vscode_1.MarkdownString("### 公众号关注组件。当用户扫小程序码打开小程序时，开发者可在小程序内配置公众号关注组件，方便用户快捷关注公众号，可嵌套在原生组件内。"),
    },
    {
        label: "open-data",
        attribute: [],
        insertText: new vscode_1.SnippetString("<open-data $1>$0</open-data>"),
        documentation: new vscode_1.MarkdownString("### 用于展示微信开放的数据。"),
    },
    {
        label: "web-view",
        attribute: [],
        insertText: new vscode_1.SnippetString("<web-view $1>$0</web-view>"),
        documentation: new vscode_1.MarkdownString("### 承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。"),
    },
    {
        label: "page-meta",
        attribute: [],
        insertText: new vscode_1.SnippetString("<page-meta $1>$0</page-meta>"),
        documentation: new vscode_1.MarkdownString("### 页面属性配置节点，用于指定页面的一些属性、监听页面事件。只能是页面内的第一个节点。可以配合 navigation-bar 组件一同使用。### 通过这个节点可以获得类似于调用 wx.setBackgroundTextStyle wx.setBackgroundColor 等接口调用的效果。"),
    },
    {
        label: "navigation-bar",
        attribute: [],
        insertText: new vscode_1.SnippetString("<navigation-bar $1>$0</navigation-bar>"),
        documentation: new vscode_1.MarkdownString("### 页面导航条配置节点，用于指定导航栏的一些属性。只能是 page-meta 组件内的第一个节点，需要配合它一同使用。### 通过这个节点可以获得类似于调用 wx.setNavigationBarTitle wx.setNavigationBarColor 等接口调用的效果。"),
    },
];
//# sourceMappingURL=component.js.map