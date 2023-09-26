function levelOrder(n) {
  let total = 1;
  for (let i = 2; i <= n; i++) {
    total *= i;
  }
  return total;
}

console.log(levelOrder(3));
