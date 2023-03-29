let nums = [2, 1, 1, 2];

var rob = function (nums) {
  if (nums.length === 1) return nums[0];
  let max = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    let temp = nums[i] + max[i - 2];
    max.push(temp > max[i - 1] ? temp : max[i - 1]);
  }
  console.log(max);
  return Math.max(...max);
};
console.log(rob(nums));
