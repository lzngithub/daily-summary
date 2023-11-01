function dataSort(origin = []) {
  let maxBit = Math.max(...origin).toString().length;
  let dev = 1, // 个位
    mod = 10, // 十位
    bucket = [];

  for (let i = 0; i < maxBit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < origin.length; j++) {
      let index = Math.floor((origin[j] % mod) / dev);
      if (!bucket[index]) bucket[index] = [];
      bucket[index].push(origin[j]);
    }

    let pos = 0;
    for (let j = 0; j < bucket.length; j++)
      while (bucket[j]?.length) origin[pos++] = bucket[j].shift();
  }
  return origin;
}

const nums = [93, 1001, 2, 4, 5];

console.log(dataSort(nums));
