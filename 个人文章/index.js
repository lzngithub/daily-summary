const throttle = (fn, delay) => {
  let record = null;
  return (...content) => {
    const value = content[0].target.value;
    if (!record) {
      record = setTimeout(() => {
        fn(value);
        clearTimeout(record);
        record = null;
      }, delay);
    }
  };
};

let inp = document.getElementById("input");
const b = (e) => {
  console.log(e);
};
const a = throttle(b, 2000);
inp.oninput = a;
