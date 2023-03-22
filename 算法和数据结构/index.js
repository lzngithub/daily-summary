let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

function changeTree(arr) {
  function searchNode(result, item) {
    if (!result.length) return false;
    let finder = false;
    result.forEach((item1) => {
      if (item1.id === item.pid) {
        item1.children.push({ ...item, children: [] });
        finder = true;
      } else {
        searchNode(item1.children, item);
      }
    });
    return finder;
  }
  const tree = [];
  arr.forEach((item) => {
    if (!searchNode(tree, item)) {
      tree.push({ ...item, children: [] });
    }
  });
  return tree;
}

console.log(changeTree(arr));

/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
};

/**
 * 转换方法
 */
const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid);
  return result;
};

console.log(arrayToTree(arr, 0));
