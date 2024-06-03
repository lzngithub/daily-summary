# mysql

创建用户

```database
CREATE USER 'liangzn'@'%' IDENTIFIED BY 'liangzn123';
GRANT ALL PRIVILEGES ON *.* TO 'liangzn'@'%';
FLUSH PRIVILEGES;
```
