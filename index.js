/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param string1 string字符串
 * @param string2 string字符串
 * @return bool布尔型
 */
function isGoodFriends(string1, string2) {
  if (string1 === string2 || string1.length !== string2.length) return false;
  function strChangeObj(str) {
    let obj = {};
    str
      .split("")
      .forEach((item) => (obj[item] = obj[item] ? obj[item] + 1 : 1));
    return obj;
  }
  let obj1 = strChangeObj(string1);
  let obj2 = strChangeObj(string2);
  for (let item in obj2) {
    if (!obj1[item]) return fasle;
  }
  return true;
}

let string1 = "abc";

let string2 = "bac";

console.log(isGoodFriends(string1, string2));
