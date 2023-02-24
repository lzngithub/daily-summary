function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

function Tree() {
  this.root = null;
}

const changeTree = (arr) => {
  arr.forEach((element) => {
    new Node(element);
  });
};
