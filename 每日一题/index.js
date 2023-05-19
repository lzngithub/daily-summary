const arr = [10, 21, 0, -7, 35, 7, 9, 23, 18];

function getMinIndex(arr) {
  return arr.findIndex(
    (item1) => item1 === Math.min(...arr.filter((item) => item > 0))
  );
}

console.log(getMinIndex(arr)); // 5
