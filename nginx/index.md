# nginx

* 2004年出的第一个版本
* 很小，大概1MB左右
* 现在出到18版本的了（2022，12）
* 反向代理，负载均衡

> 反向代理，代理的是服务器，用户端不知道具体的服务器地址
> 负载均衡，根据服务器不同的性能合理分配转发请求的数量
> 动静分离，把静态文件单独放在静态服务器中

## 安装

mac系统用brew安装

Brew全称叫Homebrew,是Mac系统上的软件包管理工具，安装可以到官网复制安装命令

如下：
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装后需要把brew加入到环境变量中（安装完成后会提示信息怎么做，注意看）

安装nginx

## 简单例子




