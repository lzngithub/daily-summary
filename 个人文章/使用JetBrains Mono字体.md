# JetBrains Mono（windows 系统安装使用）

等宽，连字，为程序员设置

具体介绍和下载请看官网：https://www.jetbrains.com/lp/mono/

## 安装字体

下载字体：https://www.jetbrains.com/lp/mono/

下载完后解压，找到...\JetBrainsMono-2.304\fonts\ttf\JetBrainsMono-Bold.ttf，双击 ttf 文件打开，安装（ttf 文件打开会有安装按钮），安装字体成功。

在系统中查看字体安装结果（系统直接搜索：字体，即可看到系统安装的相关字体）

## vs code 使用字体

在 user settiings 中增加 JetBrains Mono，放在第一位，打开连字设置。

```json
"editor.fontFamily": "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
"editor.fontLigatures": true // 打开连字
```

安装插件方便切换字体：Font Switcher

切换字体方式：shift + ctrl + p -> switch font -> 选择字体

## 推荐另外字体

Fira Code：https://github.com/tonsky/FiraCode/blob/master/README_CN.md
