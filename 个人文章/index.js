let result = null;

const fun1 = async () => {
  return new Promise((resolve) => {
    resolve("resolved");
  });
};

(async () => {
  result = await fun1();
  console.log(result); // resolved
})();
