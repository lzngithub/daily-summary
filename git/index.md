# github 没有统计到contributions

## 问题背景

在公司的电脑上，提交公司的项目的邮箱和个人项目的邮箱不一样，因为公司项目一般是用的公司邮箱。

## 问题原因

因为git提交commit的账户的邮箱在github上没有对应的记录，因为公司电脑git全局配置的邮箱是公司邮箱。

tips: github可以有一个主邮箱，还可以添加多个邮箱，在Settings -> Emails 中

解决方法：

1. 在githhub的settings中添加相应邮箱，但这个不推荐，因为当你后面删除了这个邮箱之后，contributions 也会被删除。
2. 个人项目本地配置个人邮箱覆盖全局git配置（配置）。

本地配置方法（两种）

* 进入本地git repo配置文件夹(.git文件夹)，运行配置命令

```shell
git config user.name "your-username"
git config user.email "your-email-address"
```

* 在项目的.git/config 文件里面添加

```bash
[user]
    name = your-username
    email = your-email-address
```

## 设置ssh连接

1. github添加ssh（百度）

```bash
// 测试能不能进行ssh连接
ssh -T git@github.com
```

2. 设置连接
```bash
git remote -v //看一下当前连接方式
git remote set-url origin git@github.com:<git地址>/<仓库地址>.git  //改成ssh，这里你项目的ssh地址
```