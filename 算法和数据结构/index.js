const tree = {
  value: "A",
  left: {
    value: "B",
    left: null,
    right: {
      value: "D",
      left: {
        value: "F",
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    value: "C",
    left: null,
    right: {
      value: "E",
      left: {
        value: "G",
        left: {
          value: "H",
          left: null,
          right: null,
        },
        right: {
          value: "I",
          left: null,
          right: null,
        },
      },
    },
  },
};

/**
 * @function 数组排列组合
 * [1,2,3] => 123 132 213 231 321 312
 */
let index = 0;
function permutationCombination(arr) {
  index++;
  console.log(arr);
  if (arr.length === 1) return [arr];
  const res = [];
  arr.forEach((val, index) => {
    const childArr = [...arr];
    childArr.splice(index, 1);
    res.push(...permutationCombination(childArr).map((item) => [val, ...item]));
  });
  console.log(res, "res");
  return res;
}

console.log(permutationCombination([1, 2, 3]));
console.log(index);
