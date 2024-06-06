# MySQL

数据库学习，以 MySQL 为例，现在大部分项目都是以关系型数据库作为数据库，MySQL 是开源的关系型数据库软件。

## 基本概念

### 数据库

数据库就是数据仓库的意思，每个数据库里面可以用多张表，一般用 SQL 来操作

- SQL(struction query language): 结构化查询语言，可以用 SQL 语句操作数据库。
- 数据库分类：关系型数据库，非关系型数据库。

### 数据库分类

- 常见的关系型数据库：MySQL、SQL Server、DB2、Oracle
  - 通过会创建很多二维数据表；
  - 使用 SQL 语句去操作；
  - 表可以是一对多，多对一，多对多的联系。
- 常见的非关系型数据库：mongoDB、redis 等；
  - 以键值对的形式存在；
  - 在查询过程中，不需要经过 SQL 解析。

### SQL 语句分类

- DDL(data definition language): 数据定义语言，数据库建表之类的操作；
- DML(data manipulation language): 数据操作语言，对表的增改操作；
- DQL(data query language): 数据库查询语言，对表查询操作；
- DCL(data control language): 数据库控制语言，数据库访问等权限的控制操作

### 注意的点

- SQL 语句不区分大小写，但关键字一般用大写，便于区分和阅读 SQL 语句；
- SQL 语句以分号（;）结尾
- 用关键字作为表名列名等使用时，用``包裹，但不建议用。

## MySQL 安装

mySQL 社区版是免费的，个人使用的话，基本也会够的。

安装命令或步骤跟着网上介绍来的就好。

配置等基本命令：

```SQL
mysql -uroot -pliangzn123 -- 本地使用账号root和密码liangzn123 登录数据库，首次登陆不需要密码
mysql -uroot -pliangzn123 -h12.32.342.88 -P3306 -- 本地使用账号root和密码liangzn123 登录12.32.342:3306上的数据库
```

不能远程连接 MySQL 问题排查及解决办法：

1. 首先先确定和远程服务器的网络通不通，通过 ping 命令：ping ip 地址，如果不通的话，考虑几个原因：防火墙，安全组，网络。
2. 解决网络问题，再进行数据库连接，mysql 需要进行几个配置

- mysql 默认不能进行远程连接，去配置文件修改；
- 用来连接的用户需要设置可以进行远程连接；

3. 如果还不能连接，根据连接报错信息，具体查看什么问题，一般是权限认证方式等问题。

## SQL(用户相关)

```SQL
-- 查看所有用户
SELECT user FROM mysql.user;
-- 创建新用户
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
-- 更新用户密码
SET PASSWORD FOR 'username'@'localhost' = PASSWORD('newpassword');
-- 或者使用MySQL 5.7.6及以上版本的语法
ALTER USER 'username'@'localhost' IDENTIFIED BY 'newpassword';
-- 重命名用户（MySQL 8.0以上版本支持）
RENAME USER 'old_username'@'localhost' TO 'new_username'@'localhost';
-- 删除用户
DROP USER 'username'@'localhost';
-- 给用户授权 *.* 表示所有数据库的所有表，%：所有的ip地址
GRANT ALL PRIVILEGES ON database_name.table_name TO 'username'@'localhost';
-- 撤销用户权限
REVOKE privilege ON database_name.table_name FROM 'username'@'localhost';
```

## SQL(库相关)

```SQL
SHOW DATABASES; -- 展示所有数据库
USE user; -- 使用 user 数据库
SELECT DATABASE(); -- 显示当前正在使用的数据库
CREATE DATABASE user; -- 创建user数据库，如果user存在则会报错
CREATE DATABASE IF NOT EXISTS user; -- 当user不存在的时候创建user数据库，存在也不会报错
CREATE DATABASE user
    DEFAULT CHARACTER SET utf8mb4; -- 创建user数据库，设置字符集为utf8mb4
DROP DATABASE user; -- 删除数据库 user
DROP DATABASE IF EXISTS user; -- 如果user数据库存在则删除
ALTER DATABASE user CHARACTER SET = utf8; -- 修改user数据的的字符集我utf8
```

## SQL(条件相关)

搭配查询语句，修改表语句使用，作为条件进行限制。

语句结构：WHERE 条件

```SQL
SELECT * FROM user WHERE Sno = 12345;
SELECT Sno FROM user WHERE Ssex IN ('男', '女');
```

比较运算符：

- = != <> < > >= <=: 等于 不等于 小于 大于 大于等于 小于等于;
- BETWEEN: 在两者之间，适合用于数值范围，BETWEEN 100 AND 1000;
- IN: 一组值，适合字符，IN('男', '女')
- LINK: 相似匹配，和\_ 和 % 这两个字符搭配使用， LINK '%B\_';
  - \_: 任意一个字符；
  - %：任意多个字符；

逻辑运算符：

- AND &&: 与;
- OR ||: 或;
- NOT !: 非;

## SQL(表相关)

```SQL
SHOW TABLES; -- 展示所有的表，前提必须先用 USE 去使用某一个数据库
DESC user; -- 查看user表的结构
-- 创建user表，并插入两列，第一列：名称为id，数据类型为int，作为主键，非空，自动递增；第二列：名称为name，类型为VARCHAR(20)，默认值为 ''
CREATE TABLE IF NOT EXISTS user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) DEFAULT '',
);
DROP TABLE user; -- 删除表user
DROP TABLE IF EXISTS user; -- 删除表user
ALTER TABLE user RENAME TO user1; -- 修改表名user为user1
ALTER TABLE user ADD Sscore INT; -- 在user表下增加 Sscore 列，类型为INT型
ALTER TABLE user DROP Sscore; -- 删除user表下的 Sscore 列
ALTER TABLE user CHANGE Sscore Sscore1 BIGINT; -- 修改表列 Sscore 为 Sscore1 INT;
ALTER TABLE user MODIFY Sscore INT; -- 修改表列 Sscore 的数据类型为 INT;
-- 数据行相关操作
INSERT INTO user (Sno, Sname) VALUES (2223422, 'test'); -- 新增数据
DELETE FROM user; -- 删除表中所有数据
DELETE FROM user WHERE Sno = 2223422; -- 删除表中 Sno = 2223422 的数据
UPDATE user SET Sno=2223421, Sname='test1'; -- 修改数据
UPDATE user SET Sno=2223421 WHERE Sname="test1" ; -- 修改符合条件数据
```

### SQL 数据类型

- 数字类型
- 日期类型
- 时间类型
- 字符类型

### SQL(查询相关)

```SQL
SELECT * FROM user; -- 查询user表的所有字段所有数据；
SELECT Sno FROM user; -- 查询user表的Sno列的数据；
SELECT Sno as id FROM user; -- 查询user表的Sno列的数据，并且Sno起别名为id返回
SELECT Sno FROM user WHERE Ssex = '男' && Sage > 18; -- 查询性别为男且年龄大于18岁的 Sno 值
SELECT Sno FROM user WHERE Sname LINK '_张三%'; -- 查询Sname从第二个字符开始是张三的Sno值
SELECT * FROM user ORDER BY ASC; -- 做升序排序，DESC: 降序
SELECT * FROM user LIMIT 10 OFFSET 11; -- 分页，一页10条，从11条数据开始查
SELECT AVG(Sno) FROM user; -- 通过AVG聚合函数取Sno的平均值，类型的还有：MAX MIN COUNT SUM
SELECT AVG(Sage) FROM user GROUP BY Ssex; -- 根据性别进行分组进行年龄平均值的输出
SELECT AVG(Sage) FROM user GROUP BY Ssex HAVING Ssex = '男'; -- 根据性别进行分组并选取性别为男的那组进行年龄平均值的输出
```

### 多表查询

先需要通过外键进行表之间字段关联

```SQL
-- 学生表
CREATE TABLE student (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL DEFAULT ''
);
INSERT INTO student VALUES (1, '张三');
INSERT INTO student VALUES (2, '李四');
INSERT INTO student VALUES (3, '王五');
-- 课程表
CREATE TABLE course (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL DEFAULT ''
);
INSERT INTO course VALUES (1, '语文');
INSERT INTO course VALUES (2, '数学');
INSERT INTO course VALUES (3, '英语');
-- 学生课程关系表
-- 建表的时候添加外键
CREATE TABLE student_course (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE CASCADE -- 给student_id设置外键为student表的id字段，并且增加约束条件在更新和删除的时候跟随变化
);
-- 建表后添加
ALTER TABLE student_course ADD course_id INT NOT NULL;
ALTER TABLE student_course ADD FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE ON DELETE CASCADE;
-- 学生课程关系表添加数据
INSERT INTO student_course VALUES (1, 1, 1);
INSERT INTO student_course VALUES (2, 1, 2);
INSERT INTO student_course VALUES (3, 2, 2);
```

外键更新删除约束:

- RESTRICT: 更新或删除记录的时候，会查看是否有被关联的外键记录，有的话则会报错，默认为该值；
- NOACTION: 同 RESTRICT；
- CASCADE: 会一同更新和删除；
- SET NULL: 会被设置为 NULL;

多表查询

```SQL
SELECT * FROM student, course; -- 同时查询student和course两个表的数据，查询结果为笛卡尔乘积，为3*3=9条数据，且没有对应关系
```

上面查询结果不是我们想要的，我们想要的是时学生和课程对应关系的数据，这个时候可以使用连接查询

- 左连接：LEFT JION ... ON 条件，以左表为主，在不满足条件的情况下，左表的数据也会完整显示
- 左连接：RIGHT JION ... ON 条件，以右表为主，在不满足条件的情况下，右表的数据也会完整显示
- 内连接：JION ... ON 条件，满足数据才会完整显示
- 全连接：FULL JION ... ON 条件，连接的表都会完整显示，MySQL 不支持该关键字，用 UNION 来实现

```SQL
-- 左连接
SELECT * FROM student_course
  LEFT JOIN student ON (student_course.student_id = student.id)
  LEFT JOIN course ON (student_course.course_id = course.id);
-- 右连接
SELECT * FROM student_course
  RIGHT JOIN student ON (student_course.student_id = student.id)
  RIGHT JOIN course ON (student_course.course_id = course.id);
-- 内连接
SELECT * FROM student_course
  JOIN student ON (student_course.student_id = student.id)
  JOIN course ON (student_course.course_id = course.id);
-- 全连接
(SELECT * FROM student_course sc LEFT JOIN student s ON (sc.student_id = s.id) WHERE sc.student_id IS NULL)
UNION
(SELECT * FROM student_course sc RIGHT JOIN student s ON (sc.student_id = s.id) WHERE s.id IS NULL);
-- 内连接整理
SELECT sc.id, sc.student_id, sc.course_id, s.name student_name, c.name course_name FROM student_course sc
  JOIN student s ON (sc.student_id = s.id)
  JOIN course c ON (sc.course_id = c.id);
```
