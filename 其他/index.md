## Windows11 右键

windows 11 右键显现默认不会显示全部的选项，在cmd中用以下命令修改为展示全部选项

```bash
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

恢复windows11 默认选项

```bash
reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f
```

两个操作都要重启电脑后才能生效

## 相对路径和绝对路径

相对路径是对于某一个路径来说的，绝对路径则是一个完整的路径，写法的区别主要如下：

相对路径，三种写法
* ./dist： 当前目录
* ../dist： 上级目录
* dist： 自身目录，跟./dist一样

绝对路径，两种写法
* /dist：绝对路径
* \dist：绝对路径