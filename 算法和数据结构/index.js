function seqSearch(nums, value) {
  // nums是已经排序好了的数组
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === value) {
      return mid;
    } else if (nums[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

const nums = [9, 1, 2, 4, 5];

console.log(seqSearch(nums, 1));
