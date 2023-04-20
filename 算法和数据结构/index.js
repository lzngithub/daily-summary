let nums = [7, 6, 9, 3, 1, 5, 2, 4, 10, 11];

function heapSort(origin = []) {
  let len = origin.length;

  function buildMaxHeap(origin) {
    for (let i = Math.floor(origin.length / 2); i > 0; i--) {
      heapify(origin, i);
    }
  }

  function heapify(origin, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let maxIndex = i;
    if (left < len && origin[left] > origin[maxIndex]) {
      maxIndex = left;
    }
    if (right < len && origin[right] > origin[maxIndex]) {
      maxIndex = right;
    }

    if (maxIndex !== i) {
      [origin[maxIndex], origin[i]] = [origin[i], origin[maxIndex]];
      heapify(origin, maxIndex);
    }
  }

  buildMaxHeap(origin);
  for (let i = origin.length - 1; i > 0; i--) {
    [origin[0], origin[i]] = [origin[i], origin[0]];
    len--;
    heapify(origin, 0);
  }
  return origin;
}

console.log(heapSort(nums));
