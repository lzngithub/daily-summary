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

// 修改时间对象

// 获取时间戳
let time = date.getTime();
let time1 = Date.now();
let time2 = Date.parse(date);
let time3 = date.valueOf(); // 本质是转为数字: +date 或者 Number(date)

console.log(time2, time, time1);
