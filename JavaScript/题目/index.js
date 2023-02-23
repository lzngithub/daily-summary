// 被观察者
class Subject {
  observeList = [];
  constructor(name) {
    this.name = name;
  }
  add(observer) {
    this.observeList.push(observer);
  }
  remove(observer) {
    this.observeList.filter((item) => item !== observer);
  }
  notify(message) {
    this.observeList.forEach((item) => item.update(message));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  update(message) {
    console.log(`我是${this.name}, 我收到${message}的消息了`);
  }
}

const subject = new Subject("老板");

const observer1 = new Observer("员工小明");
const observer2 = new Observer("员工小红");

subject.add(observer1);
subject.add(observer2);

subject.notify("团建");
