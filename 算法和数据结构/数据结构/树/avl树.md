# avl树

为了解决当二叉树搜索树有些情况下只有一条路径时候的操作时间复杂度很高的情况，出现了avl树

avl树是两个教授发现的，avl也是两个教授名字的缩写。平衡二叉查找树，每个节点的左右子树高度相差不超过1，他是一种高度平衡的二叉查找树，还有很多不是严格意义上的平衡二叉树，比如红黑树，他不遵循左右子树高度差不超过1，而是遵守红黑树的特点。

## 代码

```JS
class AVLTreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor(key) {
    if (key && key !== 0) {
      this.root = new AVLTreeNode(key);
    } else {
      this.root = null;
    }
  }
  getHeight(node) {
    if (node === null) {
      return 0;
    }
    return node.height;
  }
  updateHeight(node) {
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }
  getBalanceFactor(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  // 左旋
  leftRotate(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    this.updateHeight(node);
    this.updateHeight(temp);
    return temp;
  }
  // 右旋
  rightRotate(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    this.updateHeight(node);
    this.updateHeight(temp);
    return temp;
  }
  // 插入
  insert(key, node) {
    if (node === null) return new AVLTreeNode(key);

    if (key < node.key) {
      node.left = this.insert(key, node.left);
    }
    if (key > node.key) {
      node.right = this.insert(key, node.right);
    }

    this.updateHeight(node);
    let balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor < -1) {
      if (key > node.right.key) {
        return this.leftRotate(node);
      }
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    if (balanceFactor > 1) {
      if (key < node.left.key) {
        return this.rightRotate(node);
      }
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    return node;
  }
  insertNode(key) {
    this.root = this.insert(key, this.root);
  }
  // 中序遍历
  middleSearch(node = this.root, result = []) {
    if (node === null) return;
    if (node.left) this.middleSearch(node.left, result);
    result.push(node.key);
    if (node.right) this.middleSearch(node.right, result);
    return result;
  }
}

const tree = new AVLTree(10);
tree.insertNode(20);
tree.insertNode(30)
console.log(tree.middleSearch());
```