# js 中有关时间的知识点总结

## 基本知识

- js 中有关时间的操作依赖于 date 对象
- 时间字符串的标准格式为：YYYY-MM-DDTHH:mm:ss:ssZ，可以写成这样
- 月份从 0 开始到 11;
- 星期天为第 0 天;
- 时间戳有 10 位 13 位和 16 位，js 中一般用 13 位的;

## 基本使用

几号

```js
let date = new Date(); // 获取当前日期
// let date = new Date('2022-08-01'); // 生成 2022-08-01 00:00:00:00 这个时间点的时间对象

// 获取年份 月份 日份 星期几
let year = date.getFullYear(); // getYear(): 返回的是1900至今的年份，比如 2024 返回124
let month = date.getMonth();
let day = date.getDate();
let week = date.getDay();

// 获取时 分 秒 毫秒
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();
let millisecond = date.getMilliseconds();

// 修改时间对象，没有设置星期几的
date.setDate(1);
date.setMonth(1);
date.setFullYear(1);

date.setHours(1);
date.setMinutes(1);
date.setSeconds(1);
date.setMilliseconds(1);
date.setTime(1); // 以毫秒数设置对象

// 获取时间戳
let time = date.getTime();
let time1 = Date.now();
let time2 = Date.parse(date);
let time3 = date.valueOf(); // 本质是转为数字: +date 或者 Number(date)
```

## 简单应用

```js
// 格式化时间：年-月-日
let formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

// 格式化星期
let week = "星期" + "日一二三四五六".charAt(date.getDay());

// 比较时间大小
let compareTime = new Date().getTime() - new Date("2010-11-11").getTime();
```
