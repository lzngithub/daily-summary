type Person = {
  name: string;
};
type K1 = keyof Person; // "name" | "age"
