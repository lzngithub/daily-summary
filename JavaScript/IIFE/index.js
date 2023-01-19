for (var i = 0; i <10; i++) {
  setTimeout((function(){
    console.log(i);
    return 'console.log(i)';
  }()), 1000);
}
