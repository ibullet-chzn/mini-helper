# Activation Events

## 列表

+ onLanguage
+ onCommand
+ onDebug
  + onDebugInitialConfigurations
  + onDebugResolve
+ workspaceContains
+ onFileSystem
+ onView
+ onUri
+ onWebviewPanel
+ \*

## 示例代码

```json
/* onLanguage
  当打开某种语言的文件时激活
*/
...
"activationEvents": [
  "onLanguage:python",
  "onLanguage:markdown",
  "onLanguage:typescript"
]
...
```

```json
/* onCommand
  当执行某项命令时激活
*/
...
"activationEvents": [
  "onCommand:extension.sayHello"
]
...
```

```json
/* onDebug
  启用调试时激活
*/
...
"activationEvents": [
  "onDebug"
]
...
```

```json
/* workspaceContains
  当你打开的工作区至少包含一个匹配文件时激活
*/
...
"activationEvents": [
  "workspaceContains:**/.editorconfig"
]
...
```

```json
/* onFileSystem */
...
"activationEvents": [
  "onFileSystem:sftp"
]
...
```

```json
/* onView */
...
"activationEvents": [
  "onView:nodeDependencies"
]
...
```

```json
/* onUri */
...
"activationEvents": [
  "onUri"
]
...
```

```json
/* onWebviewPanel */
...
"activationEvents": [
  "onWebviewPanel:catCoding"
]
...
```

```json
/* *
  只要编辑器启动,插件就被激活,一般不建议使用.
  使用多个事件组合比 * 更好
*/
...
"activationEvents": [
  "*"
]
...
```
