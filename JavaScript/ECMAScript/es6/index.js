const obj = {};
console.log(Object.isExtensible(obj)); // true

const obj2 = Object.preventExtensions(obj);
console.log(obj === obj2); // true
console.log(Object.isExtensible(obj)); // false

obj.a = 2;
console.log(obj); // {}
