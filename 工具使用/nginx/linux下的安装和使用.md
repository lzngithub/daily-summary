# 安装

下载

```shell
cd /usr/local/src
wget http://nginx.org/download/nginx-1.24.0.tar.gz
```

下载链接可以先登录nginx官网，选择要下载的版本，然后下载，在浏览器下载内容里可以找到对应的下载链接。

解压

```shell
tar -zxvf nginx-1.22.1.tar.gz
```

编译安装

安装编译器

```shell
yum install -y gcc gcc-c++
```

安装依赖

```shell
yum install -y pcre-devel openssl-devel
```

添加www用户

```shell
useradd -s /sbin/nologin -M www
```

生成makefile文件

```shell
./configure --prefix=/usr/local/nginx --with-http_ssl_module
```

* ‌makefile文件的主要作用是实现自动化编译和管理项目。
* ./configure 是一个脚本文件，在执行过程中可以带一些参数，相当于windows安装软件时的选项。

常见的选项有：

```shell
--prefix=<path>：指定nginx的安装路径，默认为/usr/local/nginx。
 
--with-http_ssl_module：启用HTTP SSL模块，使nginx支持HTTPS协议。
 
--with-http_gzip_static_module：启用HTTP Gzip静态模块，允许nginx对静态文件进行Gzip压缩。
 
--with-http_stub_status_module：启用HTTP状态模块，提供简单的服务器状态信息，如当前活动连接数和请求统计等。
 
--with-http_realip_module：启用HTTP RealIP模块，用于从代理服务器或负载均衡器获取真实客户端IP地址。
 
--with-pcre：指定PCRE库的路径，用于支持正则表达式的处理。
 
--with-zlib：指定Zlib库的路径，用于支持HTTP Gzip模块等压缩功能。
 
--with-openssl：指定OpenSSL库的路径，用于支持HTTPS加密功能。
 
--with-stream：启用Stream模块，支持TCP和UDP代理功能。
 
--with-mail：启用Mail模块，支持邮件代理功能。
 
--with-debug：启用调试模式，产生带有调试信息的nginx可执行文件。
 
# 以上只是一些常见的配置选项示例。您可以根据您的需求添加或删除其他选项。运行./configure --help命令可以查看所有可用的配置选项及其描述。
 
# 请注意，在指定选项之前，您可能需要先安装相关的依赖库，并将其路径正确指定到对应的配置选项中。
```

编译安装

```shell
make && make install
```

## 启动和停止

nginx下的启动

```shell
cd /usr/local/nginx/sbin
./nginx
```

停止

```shell
./nginx -s stop
```

重启

```shell
./nginx -s reload
```

## 将nginx命令添加到环境变量

每次都需要进到nginx的安装目录下执行命令不方便，可以把nginx的添加到系统PATH路径下，可以在任何位置运行命令。

将nginx添加到PATH

```shell
vim ~/.bashrc
```

在文件末尾添加

```conf
export PATH=$PATH:/usr/local/nginx/sbin
```

使更改生效，可以通过执行以下命令：

```shell
source ~/.bashrc
# 或者
source ~/.profile
```

验证是否生效

```shell
nginx -v
```

## 修改配置文件

如果忘记配置文件在哪，可以通过下面命令查找

```shell
whereis nginx
nginx -t
```

拿到配置文件地址后，用vim进行修改

```shell
vim /usr/local/nginx/conf/nginx.conf
```







