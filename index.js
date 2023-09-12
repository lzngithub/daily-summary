function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y / 3;
  return x + y + z;
}

var b = foo(5);
console.log(b.next()); //   { value:6, done:false }
console.log(b.next(12)); // { value:8, done:false }
console.log(b.next(13)); // { value:42, done:true }
