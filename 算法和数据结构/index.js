let nums = [7, 6, 9, 3, 1, 5, 2, 4, 10, 11];

function mergeSort(nums) {
  if (nums.length < 2) return nums;
  var middle = Math.floor(nums.length / 2),
    left = nums.slice(0, middle),
    right = nums.slice(middle);
  return merge(mergeSort(left), mergeSort(right));

  function merge(left, right) {
    var result = [];
    while (left.length > 0 && right.length > 0) {
      let name = left[0] < right[0] ? left : right;
      result.push(name.shift());
    }
    return result.concat(left, right);
  }
}

console.log(mergeSort(nums));
