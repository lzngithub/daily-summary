let nums = [6, 7, 8, 9, 1, 2, 5];

function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length);
  dp[0] = 1;
  let maxans = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxans = Math.max(maxans, dp[i]);
  }
  console.log(dp);
  return maxans;
}

console.log(lengthOfLIS(nums));
