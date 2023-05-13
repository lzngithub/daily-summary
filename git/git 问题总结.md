# git 问题总结

## github 没有统计到 contributions

### 问题背景

在公司的电脑上，提交公司的项目的邮箱和个人项目的邮箱不一样，因为公司项目一般是用的公司邮箱。

### 问题原因

因为 git 提交 commit 的账户的邮箱在 github 上没有对应的记录，因为公司电脑 git 全局配置的邮箱是公司邮箱。

tips: github 可以有一个主邮箱，还可以添加多个邮箱，在 Settings -> Emails 中

### 解决方法

1. 在 githhub 的 settings 中添加相应邮箱，但这个不推荐，因为当你后面删除了这个邮箱之后，contributions 也会被删除。
2. 个人项目本地配置个人邮箱覆盖全局 git 配置（配置）。

本地配置方法（两种）

- 进入本地 git repo 配置文件夹(.git 文件夹)，运行配置命令

```shell
git config user.name "your-username"
git config user.email "your-email-address"
```

- 在项目的.git/config 文件里面添加

```bash
[user]
    name = your-username
    email = your-email-address
```

## 设置 ssh 连接

使用 http 链接因为网速问题经常失败，所以改用 ssh 链接的方式

ssh：专为远程登录会话和其他网络服务提供安全性的协议。

### github 添加 ssh（可百度）

无非那么几步，电脑生成 ssh 密钥，添加 ssh 密钥到 github 中

1.产看是否已经生成过密钥，生成过可跳过生成密钥那步

```shell
ls -al ~/.ssh
```

2.采用使用 rsa 算法，4096 位，生成密钥

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

然后终端会让你输入一些东西，可以不用输入直接一路回车知道密钥文件生成成功

3.打开密钥文件，复制密钥

```shell
cat ~/.ssh/id_rsa.pub
```

4.将公钥添加到 github 账户，在

```text
github --> Settings --> SSH and GPG keys --> New SSH key
```

### 设置 git ssh 连接

测试能不能进行 ssh 连接

```bash
ssh -T git@github.com
```

看一下当前连接方式

```bash
git remote -v
```

改成 ssh，这里你项目的 ssh 地址

```bash
git remote set-url origin git@github.com:<git地址>/<仓库地址>.git
```
