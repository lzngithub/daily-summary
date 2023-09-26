const obj = {
  get notifier() {
    delete this.notifier;
    const computed = 100;
    return (this.notifier = computed);
  },
};
console.log(obj.notifier);
console.log(obj.notifier);
