function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const insertNode = (node, newNode) => {
      if (newNode.value < node.value) {
        if (node.left) {
          insertNode(node.left, newNode);
        } else {
          node.left = newNode;
        }
      } else {
        if (node.right) {
          insertNode(node.right, newNode);
        } else {
          node.right = newNode;
        }
      }
    };

    let Node = new TreeNode(value);
    if (this.root) {
      insertNode(this.root, Node);
    } else {
      this.root = Node;
    }
  }

  min(current = this.root) {
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }
  max(current = this.root) {
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }
  remove(value) {
    const removeNode = (node, value) => {
      if (!node) return null;
      if (value === node.value) {
        if (node.left && node.right) {
          node.value = this.min(node.right);
          node.right = removeNode(node.right, node.value);
        } else {
          return node.left ?? node.right;
        }
      } else {
        let currentNode = value < node.value ? "left" : "right";
        node[currentNode] = removeNode(node[currentNode], value);
      }
      return node;
    };
    this.root = removeNode(this.root, value);
  }
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(11);
tree.insert(5);
tree.insert(4);
tree.insert(8);
tree.insert(7);
tree.insert(9);
tree.insert(12);
tree.remove(5);
console.log(tree);
