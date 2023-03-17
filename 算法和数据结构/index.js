const tree = {
  value: "A",
  left: {
    value: "B",
    left: null,
    right: {
      value: "D",
      left: {
        value: "F",
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    value: "C",
    left: null,
    right: {
      value: "E",
      left: {
        value: "G",
        left: {
          value: "H",
          left: null,
          right: null,
        },
        right: {
          value: "I",
          left: null,
          right: null,
        },
      },
    },
  },
};

function beforeOrder(root) {
  if (!root) {
    return;
  }
  console.log(root.value);
  beforeOrder(root.left);
  beforeOrder(root.right);
}

function middleOrder(root) {
  if (!root) {
    return;
  }
  middleOrder(root.left);
  console.log(root.value);
  middleOrder(root.right);
}

function afterOrder(root) {
  if (!root) {
    return;
  }
  afterOrder(root.left);
  afterOrder(root.right);
  console.log(root.value);
}
class Stack {
  data = [];
  push(item) {
    return this.data.push(item);
  }
  pop() {
    return this.data.pop();
  }
  isEmpty() {
    return this.data.length === 0;
  }
  peek() {
    return this.data.length ? this.data[this.data.length - 1] : "栈为空";
  }
}
function beforeSearch(root) {
  if (!root) return;
  const result = [];
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const currentNode = stack.pop();
    result.push(currentNode.value);
    if (currentNode.right) stack.push(currentNode.right);
    if (currentNode.left) stack.push(currentNode.left);
  }
  return result;
}

/**
 *
 * 把握入栈和出栈的时间，意想不到的惊喜
 */

function middleSearch(root) {
  if (!root) return;
  const result = [];
  const stack = [];
  currentNode = root;
  do {
    if (currentNode.right) stack.push(currentNode.right);
    stack.push(currentNode);
    if (currentNode.left) currentNode = stack.pop();
  } while (stack.length);
  return result;
}

function afterSearch(root) {
  if (!root) return;
  const result = [];
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const currentNode = stack.pop();
    result.unshift(currentNode.value);
    if (currentNode.left) stack.push(currentNode.left);
    if (currentNode.right) stack.push(currentNode.right);
  }
  return result;
}

console.log(middleSearch(tree));
