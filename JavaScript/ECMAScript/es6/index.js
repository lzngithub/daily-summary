class User {
  constructor(name) {
    // 调用 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      return;
    }
    this._name = value;
  }
}

let user = new User('John');
console.log(user._name);
