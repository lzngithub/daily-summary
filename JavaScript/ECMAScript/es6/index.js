function* foo() {
  yield 1;
  return 6;
}
const iterator = {
  [Symbol.iterator]: foo,
};

for (let v of foo()) {
  console.log(v); // 1
}
for (let v of iterator) {
  console.log(v); // 1
}
