let date = new Date(); // 获取当前日期

// 格式化时间：年-月-日
let formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

// 格式化星期
let week = "星期" + "日一二三四五六".charAt(date.getDay());

// 比较时间大小
let compareTime = new Date().getTime() - new Date("2010-11-11").getTime();

console.log(compareTime);
