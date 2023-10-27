document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    console.log(document.visibilityState, "暂停动画");
  } else {
    console.log(document.visibilityState, "启动动画");
  }
});
