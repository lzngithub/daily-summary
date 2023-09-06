let globalParams = 124231;

function a() {
  let aParams = 2323;
  b();
}

function b() {
  let bParams = 32424;
  let aaaa = 232323;
  setTimeout(() => {
    console.log(3333);
  }, 0);
  c();
}

function c() {
  let cParams = 42424;
}

a();
console.log(111);
