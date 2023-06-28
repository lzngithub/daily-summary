var a = 10,
  b = 20,
  c = 30;
++a;
a++;
e = ++a + ++b + c++ + a++; // 13 + 21 + 31 + 14
console.log(a, b, c, e);
