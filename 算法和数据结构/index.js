let cost = [10, 15, 20];

/**
 *
 * @param {number} n
 * @returns {number}
 */
function climbStairs(cost) {
  let result = 0;
  let i = 0;
  for (; i < cost.length - 1; ) {
    console.log(result, i);
    const a = cost[i];
    const next1 = i + 1 < cost.length ? cost[i + 1] : 0;
    const next2 = i + 2 < cost.length ? cost[i + 2] : 0;
    const next3 = i + 3 < cost.length ? cost[i + 3] : 0;
    console.log(a, next1, next2, next3);
    if (a + next2 <= next1 + next3) {
      result = result + cost[i];
      i = i + 2;
    } else {
      result = result + cost[i];
      i = i + 1;
    }
  }
  console.log(i);
  console.log(result);
  if (i === cost.length - 1) {
    result = result + cost.pop();
  }
  return result;
}

/**
 * dp(i) = num[i] + dp(i -2) 比较 num[i-1] + dp(i-3)
 *
 * 四步一看
 *  [1, 1, 1, 1, 1, 3]
 * dp(2) = 10 两条路线
 * dp(3) = 15 10+15 15 两条路线，最多不超两步
 * dp(4) = 16 dp(1) + dp(2)
 * dp(5) = 16 dp(1) + dp(2)
 */

console.log(climbStairs(cost));
