interface Animal {
  name: string;
}

interface Dog {
  name: string;
  age: number;
}

type a = Dog extends Animal ? 1 : 2