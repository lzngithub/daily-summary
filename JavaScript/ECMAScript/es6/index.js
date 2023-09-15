class A {
  say() {
    console.log(this);
  }
}

class B extends A {
  constructor() {
    super();
    this.say = this.say.bind(this);
  }
  say() {
    console.log(this);
  }
  s = () => {
    console.log(this);
  };
}

const b = new B();
const s = b.s;
b.say();
s();
