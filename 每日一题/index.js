let a = [1, 2];
let b = {
  c: 1,
  d: 2,
};

// a.map((item, index) => console.log(item, index));

Object.prototype.objMap = function (fun) {
  let origin = this;
  let target = {};
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = fun(key, origin[key]);
    }
  }
  return target;
};

let c = b.objMap((item, index) => index);
console.log(c);
