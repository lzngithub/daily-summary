const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

function test() {
  list.reduce(async (_, x) => {
    await _;
    const res = await square(x);
    console.log(res);
  }, undefined);
}
test();
