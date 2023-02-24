class classA {
  constructor() {}
}

const HocClass = function (WrappedClass) {
  let instance = null;
  return new Proxy(WrappedClass, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args);
      }
      return instance;
    },
  });
};

const NewClass = new HocClass(classA);
NewClass.prototype.say = () => {};

const a1 = new NewClass();
const a2 = new NewClass();

console.log(a1 === a2);
a1.say();
