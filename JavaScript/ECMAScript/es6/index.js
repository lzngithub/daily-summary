const object1 = {};
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false, // 不可修改
});
object1.property1 = 77;
// Throws an error in strict mode
console.log(object1.property1);
// Expected output: 42
