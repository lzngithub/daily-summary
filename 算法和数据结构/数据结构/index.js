const linkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null,
    },
  },
};

var reverseList = function (head) {
  if (!head || !head.next) return head;
  let temp = null,
    pre = null,
    cur = head;
  while (cur) {
    temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  // temp = cur = null;
  return pre;
};

console.log(reverseList(linkedList));
