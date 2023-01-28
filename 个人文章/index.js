const debounce = (fn, delay) => {
  let timer = null;
  return (...params) => {
    // 清除定时器
    if (timer) clearTimeout(timer);
    // 重新设定定时器
    timer = setTimeout(() => {
      fn(...params);
      clearTimeout(timer);
    }, delay);
  };
};

let inp = document.getElementById("input");
const b = (e) => {
  console.log(e.target.value);
};
const a = debounce(b, 2000);
inp.oninput = a;
