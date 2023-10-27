class Stack {
  #data = [];
  isEmpty() {
    return this.#data.length === 0;
  }
  size() {
    return this.#data.length;
  }
  push(item) {
    return this.#data.push(item);
  }
  pop() {
    return this.#data.length ? this.#data.pop() : "栈为空";
  }
  peek() {
    return this.#data.length ? this.#data[this.#data.length - 1] : "栈为空";
  }
  clear() {
    this.#data = [];
  }
}

function dec(decNumber) {
  const stack = new Stack();
  let number = decNumber;
  let result = "";
  while (number > 0) {
    stack.push(Math.floor(number % 2));
    number = Math.floor(number / 2);
  }
  while (!stack.isEmpty()) {
    result += stack.pop();
  }
  return result;
}

console.log(dec(10));
