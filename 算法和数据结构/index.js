var generateMatrix = function (n) {
  let nums = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let count = 1;
  let row;
  let col;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    row = i;
    col = i;
    for (; col < n - 1 - i; col++) nums[row][col] = count++;
    for (; row < n - 1 - i; row++) nums[row][col] = count++;
    for (; col > i; col--) nums[row][col] = count++;
    for (; row > i; row--) nums[row][col] = count++;
  }
  if (n % 2 === 1) nums[Math.floor(n / 2)][Math.floor(n / 2)] = count++;
  return nums;
};

console.log(generateMatrix(3));
// n = 3
// 1 2 3 0 0  0 2
// 8 9 4
// 7 6 5      2 2

// n=4
// 1  2  3  4  8(0, 0) ->         (0, n-1)
// 12 13 14 5  8(1, 0) -> (1 n-2)
// 11 16 15 6  8
// 10 9  8  7  8(n-1, 0) ->        (n -1, n-1)
// 8 8 88  8  8/
