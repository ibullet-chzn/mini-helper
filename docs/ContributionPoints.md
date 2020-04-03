# Contribution Points

## 列表

+ configuration - 插件的配置(用户可修改 settings.json)
+ configurationDefaults - 覆盖编辑器的默认配置
+ commands - 当执行某项命令时(command+shift+P)
+ menus - 定义菜单
+ keybindings - 定义快捷键
+ languages - 定义一种新的语言
+ debuggers
+ breakpoints - 断点
+ grammars - 语法
+ themes - 主题
+ snippets - 代码片段
+ jsonValidation
+ views
+ viewsContainers
+ problemMatchers
+ problemPatterns
+ taskDefinitions
+ colors
+ typescriptServerPlugins
+ resourceLabelFormatters

## 讲解

### menus - 定义菜单

```json
/* menus */
...
"contributes": {
  "menus": {
    "editor/title": [{
      "when": "resourceLangId == markdown",
      "command": "markdown.showPreview",
      "alt": "markdown.showPreviewToSide",
      "group": "navigation"
    }]
  }
}
...
```

+ 配置
  + editor/title是key值，定义这个菜单出现在哪里
  + when控制菜单什么情况下会出现
    + resourceLangId == javascript：当编辑的文件是js文件时
    + resourceFilename == test.js：当当前打开文件名是test.js时
    + isLinux、isMac、isWindows：判断当前操作系统
    + editorFocus：编辑器具有焦点时
    + editorHasSelection：编辑器中有文本被选中时
    + view == someViewId：当当前视图ID等于someViewId时
    + 等等
    + PS: 多个条件可以通过与或非进行组合，例如：editorFocus && isWindows && resourceLangId == javascript
  + command定义菜单被点击后要执行什么操作
  + alt定义备用命令，按住alt键打开菜单时将执行对应命令
  + group定义菜单分组
    + navigation- 放在这个组的永远排在最前面
    + 1_modification - 更改组
    + 6_custom - 自定义分组
    + 9_cutcopypaste - 编辑组
    + z_commands - 最后一个默认组，其中包含用于打开命令选项板的条目
    + 以上仅为示例，不能key值对应的默认分组不同，但都是按照0-9，a-z排序的，组内排序可通过xxx@2的方式调整

+ key值
  + 资源管理器上下文菜单 - explorer/context
  + 编辑器上下文菜单 - editor/context
  + 编辑标题菜单栏 - editor/title
  + 编辑器标题上下文菜单 - editor/title/context
  + 调试callstack视图上下文菜单 - debug/callstack/context
  + SCM标题菜单 - scm/title
  + SCM资源组菜单 - scm/resourceGroup/context
  + SCM资源菜单 - scm/resource/context
  + SCM更改标题菜单 - scm/change/title
  + 左侧视图标题菜单 - view/title
  + 视图项菜单 - view/item/context
  + 控制命令是否显示在命令选项板中 - commandPalette

### snippets - 代码片段

```json
/* snippets */
...
"contributes": {
  "snippets": [
    {
      // 代码片段作用于那种语言
      "language": "javascript",
      // 片段文件路径
      "path": "./snippets/javascript.json"
    }
  ]
}
...
```

```json
/* snippets/javascript.json */
{
  "for循环": {
    "prefix": "for",
    "body": [
      "for (const ${2:item} of ${1:array}) {",
      "\t$0",
      "}"
    ],
    "description": "for循环"
  }
}
```

+ for循环：snippets的名字
+ prefix：输入什么单词触发代码片段
+ body：一个数组，存放代码片段的内容，每一行一个字符串
+ description：片段的描述
+ ${1:xxx}占位符，数字表示光标聚焦的顺序，1表示默认光标落在这里，按下回车或者tab跳到2的位置，以此类推，xxx表示此位置的默认值，可省略，比如直接写$3

## 示例代码

```json
/* configurationDefaults */
...
"contributes": {
  "configurationDefaults": {
    "[markdown]": {
      "editor.wordWrap": "on",
      "editor.quickSuggestions": false
    }
  }
}
...
```
