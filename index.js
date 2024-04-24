let date = new Date(); // 获取当前日期
// let date = new Date('2022-08-01'); // 生成 2022-08-01 00:00:00:00 这个时间点的时间对象

// 获取年份 月份 日份 星期几
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let week = date.getDay();

// 获取时 分 秒 毫秒
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();
let millisecond = date.getMilliseconds();

// 获取时间戳
let time = date.getTime();
let time1 = Date.now();
let time2 = Date.parse(date);

console.log(time2, time, time1);
