// 发布订阅中心
class PubSub {
  constructor() {
    this.messages = {};
    this.listeners = {};
  }
  publish(type, content) {
    if (!this.messages[type]) {
      this.messages[type] = [];
    }
    this.messages[type].push(content);
  }
  subscribe(type, cb) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
  }
  notify(type) {
    const messages = this.messages[type];
    const subscribers = this.listeners[type] || [];
    subscribers.forEach((cb, index) => cb(messages));
  }
}

// 发布者
class Publisher {
  constructor(name, context) {
    this.name = name;
    this.context = context;
  }
  publish(type, cb) {
    this.context.publish(type, cb);
  }
}
// 订阅者
class Subscriber {
  constructor(name, context) {
    this.name = name;
    this.context = context;
  }
  subscribe(type, cb) {
    this.context.subscribe(type, cb);
  }
}

const TYPE_A = "类型1";
const TYPE_B = "类型2";

const pubsub = new PubSub();

const publisherA = new Publisher("publishA", pubsub);
const publisherB = new Publisher("publishB", pubsub);

const subscriberA = new Subscriber("subscriberA", pubsub);
const subscriberB = new Subscriber("subscriberB", pubsub);

subscriberA.subscribe(TYPE_A, (res) => {
  console.log(`我是订阅者A：收到${TYPE_A}消息为：${res}`);
});
subscriberA.subscribe(TYPE_B, (res) => {
  console.log(`我是订阅者A：收到${TYPE_B}消息为：${res}`);
});
subscriberB.subscribe(TYPE_B, (res) => {
  console.log(`我是订阅者B：收到${TYPE_B}消息为：${res}`);
});

publisherA.publish(TYPE_A, `发布者A针对${TYPE_A}发了一条消息`);
publisherA.publish(TYPE_B, `发布者A针对${TYPE_B}发了一条消息`);
publisherB.publish(TYPE_B, `发布者B针对${TYPE_B}发了一条消息`);

pubsub.notify(TYPE_A);
pubsub.notify(TYPE_B);
