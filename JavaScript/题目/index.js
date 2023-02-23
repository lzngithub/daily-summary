const arr = ["apple", "banana", "pear", "orange", "apple"];

const obj = arr.reduce((obj, key) => {
  if (obj[key]) {
    obj[key]++;
  } else {
    obj[key] = 1;
  }
  return obj;
}, {});

console.log(obj);
