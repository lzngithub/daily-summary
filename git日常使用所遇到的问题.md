# git日常问题

## 使用git cz

问题描述：git cz 不是git命令

分析：git cz 不是官方命令，是插件命令，因此需要全局安装git cz 插件

解决办法：

```shell
npm install -g git commitizen
```

## git 创建本地分支并推送到远程

```shell
# 分支的名字是dev

# 创建新的分支
git checkout -b dev

# 推送到远程
git push -u origin dev
```

