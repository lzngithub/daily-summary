# nginx

* 2004年出的第一个版本
* 很小，大概1MB左右
* 现在出到22版本的了（2022，11）
* 反向代理，负载均衡，动静分离

> 反向代理，前后端分离，代理服务器，用户端不知道具体的服务器地址
> 负载均衡，根据服务器不同的性能合理分配转发请求的数量
> 动静分离，把静态文件单独放在静态服务器中

## 安装

### mac系统用brew安装

Brew全称叫Homebrew,是Mac系统上的软件包管理工具，安装可以到官网复制安装命令

如下：
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装后需要把brew加入到环境变量中（安装完成后会提示信息怎么做，注意看）

mac用brew安装就好

windows， 官网下载解压就可以直接用了

## 启动

在nginx目录下打开cmd，运行start nginx

## 常用命令

```bash
# 查看版本号
nginx -v
# 启动nginx
start nginx
# 重载配置文件
nginx -s reload
# 快速退出
nginx -s stop
# 安全退出
nginx -s quit
# 查找正在运行的nginx进程
tasklist /fi "imagename eq nginx.exe"
# 杀死正在运行的nginx进程
taskkill /f /im nginx.exe
```

## 简单例子

1. 打包好的前端项目，在nginx服务器下面新建projects文件夹，将前端项目文件放到projects文件夹下

2. 修改配置文件nginx.conf

```config
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        port_in_redirect  off;
        location / {
            proxy_pass http://39.103.149.209:8164;
            root   projects/dist/;
            index  index.html;
        }
    }
}
```

3. 重载配置文件，通过nginx -s reload命令






