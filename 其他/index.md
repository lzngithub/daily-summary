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