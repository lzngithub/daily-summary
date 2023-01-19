
function a() {
  let i = 0;
  return function b() {
    return console.log(i);
  }
}
let c = a();
c(); // 0