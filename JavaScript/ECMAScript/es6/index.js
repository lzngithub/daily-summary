var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: false,
  value: 10,
  writable: true,
});

var p = new Proxy(obj, {
  get: function (target, prop) {
    return target[prop] ? 20 : undefined;
  },
});

console.log(p.a); //会抛出 TypeError
