const a = new Promise((_, reject) => {
  reject(111);
})
  .catch((error) => {
    console.log(error, "error1");
    return Promise.reject(222);
  })
  .catch((error2) => {
    console.log(error2, "error2");
  });
