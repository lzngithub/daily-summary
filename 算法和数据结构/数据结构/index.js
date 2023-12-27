// function levelOrder(root, queue = [], result = []) {
//   if (root) queue.push(root);
//   if (queue.length === 0) return [];
//   let len = queue.length;
//   result.push([]);
//   for (let i = 0; i < len; i++) {
//     let currentNode = queue.shift();
//     result[result.length - 1].push(currentNode.value);
//     if (currentNode.left) queue.push(currentNode.left);
//     if (currentNode.right) queue.push(currentNode.right);
//   }
//   levelOrder(null, queue, result);
//   return result;
// }

var levelOrder = (root) => {
  const result = [];
  const queue = [];
  function handleTree() {
    let len = queue.length; // 提前记录下队列的长度数据，每次递归是递归一层的节点
    for (let i = 0; i < len; i++) {
      let currentNode = queue.shift();
      result.push(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    if (queue.length) {
      handleTree();
    }
  }
  queue.push(root);
  handleTree();
  return result;
};

// 中序遍历

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

console.log(levelOrder(tree));
