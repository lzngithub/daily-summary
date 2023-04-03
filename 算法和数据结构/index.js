var swapPairs = function (head, n) {
  let ret =
    (slow =
    fast =
      {
        val: 0,
        next: head,
      });
  while (n--) {
    fast = fast.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return ret.next;
};

let head = {
  val: 5,
  next: null,
};

const b = swapPairs(head, 1);
let c = b;
while (c) {
  console.log(c.val);
  c = c.next;
}
