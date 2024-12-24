# 安装

系统版本型号：Linux VM-4-16-opencloudos 6.6.6-2401.0.1.oc9.4.x86_64

## 安装前准备

检查是否已经安装了mysql

```SHELL
rpm -qa | grep mysql
```

* rpm: red hat package manager的缩写，是红帽子开发的一个linux包管理器；
* -qa：参数，列出所有已经安装的软件包；
* |: 管道符，用于将前一个命令的输出作为后一个命令的输入；
* grep mysql: 在字符串中搜索含有mysql字符串的行。

有输出相关的mysql信息，则证明安装了mysql则不需要再安装了，或者卸载后再进行安装。

同时需要检查是安装了mariadb，因为mariadb是有冲突的，如果安装了需求先卸载。

```SHELL
rpm -qa | grep mariadb
```

## 下载

通过wget下载yum官方源到本地（后续通过yum官方源安装mysql）

* wget：linux系统的下载工具；

```SHELL
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```

## 安装

通过 yum 安装官方的yum 仓库(相当于于写入mysql的配置，后续安装管理mysql包按照这个配置来，因为安装mysql需要安装好几个包)

* yum 是linux基于rpm包的高层次管理工具，简化rpm包的安装，更新，维护，更方便的处理软件包的依赖关系。

```shell
yum -y install mysql57-community-release-el7-11.noarch.rpm
```

真正安装mysql

```shell
yum install -y mysql-community-server
```

这个时候会陆陆续续安装这几个包：

* mysql-community-common-5.7.44-1.el7.x86_64
* mysql-community-libs-5.7.44-1.el7.x86_64
* mysql-community-client-5.7.44-1.el7.x86_64
* mysql-community-server-5.7.44-1.el7.x86_64

到这个时候安装完成。

## 启动服务

```shell
systemctl start mysqld # 启动服务
systemctl status mysqld # 查看服务状态
```

* systemctl是linux上管理服务的工具。

获取初始密码：

```shell
grep "password" /var/log/mysqld.log
```

登录并修改密码（用从上面获取的初始密码登录）

```shell
mysql -u root -p
```

修改密码（初始密码一般比较复杂），密码组成策略可以参考初始密码设置，包含大小写字母、数字、字符等。

```sql
alter user 'root'@'localhost' identified by 'Root@123456';
```

设置远程登录

```sql
grant all privileges  on *.* to root@'%' identified by "Root@123456";
```

开放防火墙端口

```shell
cd /etc/sysconfig/
vim iptables
```

添加代码

```text
-A INPUT -p tcp --dport 3306 -j ACCEPT
```

配置mysql字符编码

```shell
vim /etc/my.cnf
```

添加代码

```text
character_set_server=utf8
init_connect='SET NAMES utf8'
```

重启mysql

```shell
systemctl restart mysqld
```