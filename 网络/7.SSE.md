# SSE

## 背景

对于接口数量量比较大的时候，为了放置接口接口等待时间过久，可以采用 SSE 方案，服务端通过分段向客户端返回流的方式，先拿到部分数据进行展示，从而提升用户体验。

在使用 ChatGPT 时，发现输入 prompt 后，是使用流式的效果返回的数据，而是基于 EventStream 的事件流。

为什么要这样传输，从使用场景上来说，ChatGPT 是一个基于深度学习的大型语言模型，处理自然语言需要大量的计算资源和时间，响应速度肯定比普通的读数据库要慢。

接口等待时间过长，显然不合适。对于这种对话场景，ChagtGPT 将先计算出的数据“推送”给用户，采用 SSE 技术边计算边返回，避免用户因为等待时间过长关闭页面。

## 定义

SSE, Server-Sent Events 服务器推送事件，简称 SSE，是一种服务端实时主动向浏览器推送消息的技术。

与 WebSocket 技术相比，SSE 更加简单，适用于单向通信场景，可以实现服务器向客户端的实时推送。

SSE 是 HTML5 中一个与通信相关的 API，主要由两部分组成：

- 服务端与浏览器端的通信协议（HTTP 协议）
- 浏览器端可供 JavaScript 使用的 EventSource 对象。

从“服务端主动向浏览器实时推送消息”这一点来看，该 API 与 WebSockets API 有一些相似之处。但是，该 API 与 WebSockers API 的不同之处在于：

|             Server-Sent Events API              |        WebSockets API        |
| :---------------------------------------------: | :--------------------------: |
|                 基于 HTTP 协议                  |        基于 TCP 协议         |
|          单工，只能服务端单向发送消息           | 全双工，可同时发送和接收消息 |
|                轻量级，使用简单                 |           相对复杂           |
|          内置断线重连和消息追踪的功能           |  不在协议范围内，需手动实现  |
| 文本或使用 Base64 编码和 gzip 压缩的二进制消息  |           类型广泛           |
|               支持自定义事件类型                |     不支持自定义事件类型     |
| 连接数 HTTP/1.1 6 个，HTTP/2 可协商（默认 100） |         连接数无限制         |

## 服务端实现

```text
headers：
 Content-Type: text/event-stream
 Cache-Control: no-cache
 Connection: keep-alive
```

- SSE API 规定推送事件流的 MIME 类型为 text/event-stream。
- 必须指定浏览器不缓存服务端发送的数据，以确保浏览器可以实时显示服务端发送的数据。
- SSE 是一个一直保持开启的 TCP 连接，所以 Connection 为 keep-alive。

## 客户端实现

fetch() 和 EventSource 都是用于实现服务器推送事件（Server-Sent Events，SSE）的技术，但它们在实现上有一些不同。

### fetch

fetch 简单实现

```js
fetch('url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 }),
})
  .then(async (response) => {
    const reader = response.body.getReader();
    let result = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result = new TextDecoder().decode(value);
      console.log(result);
    }
  })
  .catch((error) => {
    // 处理错误
    console.error('请求失败:', error);
  });
```

fetch() 的优点：

- 更灵活的数据处理：使用 fetch() 方法可以更灵活地处理 SSE 数据流，因为我们可以使用 JavaScript 中的任何方法来处理和解析从 SSE 服务器端点接收的数据流。例如，我们可以使用 TextDecoder 对象来解码数据流并将其转换为字符串，然后使用 split() 方法将其拆分为多个行。

- 更高的兼容性：fetch() 方法是一个标准的 Web API，支持所有主流的现代浏览器。因此，使用 fetch() 方法可以获得更高的兼容性。

- 更好的控制权：使用 fetch() 方法可以更好地控制 SSE 数据流的读取和处理。我们可以手动控制 SSE 数据流的读取进度，而不是依赖于 EventSource 对象的自动控制。

fetch() 的缺点：

- 需要手动解析数据：使用 fetch() 方法需要手动解析从 SSE 服务器端点接收的数据流，这需要一些额外的代码和技术。

- 无法自动重连：使用 fetch() 方法无法自动重连 SSE 服务器端点。如果与 SSE 服务器端点的连接断开，我们需要手动重新连接。

- 无法处理错误：使用 fetch() 方法无法处理 SSE 数据流的错误。如果发生错误，我们需要手动处理并调试代码。

### EventSource

EventSource 简单实现

```js
const endpoint = 'http://example.com/sse';

const eventSource = new EventSource(endpoint);

eventSource.addEventListener('open', (event) => {
  console.log('Connected to SSE server');
});

eventSource.addEventListener('message', (event) => {
  console.log(event.data);
});

eventSource.addEventListener('error', (error) => {
  console.error(error);
});

setTimeout(() => {
  eventSource.close();
  console.log('Connection closed');
}, 60000);
```

EventSource 的优点：

- 自动重连：EventSource 对象提供了自动重连的功能。如果与 SSE 服务器端点的连接断开，EventSource 对象会自动尝试重新连接，并恢复之前的数据流。

- 自动解析数据：EventSource 对象自动解析从 SSE 服务器端点接收的数据流，并将其转换为 JavaScript 对象，方便我们进行处理和操作。

- 错误处理：EventSource 对象提供了错误处理的功能。如果发生错误，EventSource 对象会触发错误事件，并提供错误信息，方便我们进行调试和处理。

EventSource 的缺点：

- 低兼容性：EventSource 对象是一个 HTML5 新增的 Web API，可能不被所有的浏览器所支持。一些旧版的浏览器可能不支持 EventSource 对象。

- 可能会出现内存泄漏：使用 EventSource 对象可能会出现内存泄漏的问题，特别是在长时间运行的情况下。因此，我们需要注意释放 EventSource 对象。

综上所述，fetch() 方法和 EventSource 对象都有各自的优缺点。如果你需要更灵活的数据处理。

fetch 优化版本

```js
const fetchEventSource = (url, options) => {
  fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        // 连接开始
        options.onopen && options.onopen();
        return response.body;
      }
    })
    .then((body) => {
      const reader = body.getReader();
      const push = () => {
        return reader.read().then(({ done, value }) => {
          if (done) {
            options.onclose && options.onclose();
            return;
          }
          options.onmessage &&
            options.onmessage(new TextDecoder().decode(value));
          // 持续 读取信息流
          return push();
        });
      };
      return push;
    })
    .then((error) => {
      options.onerror && options.onerror(error);
    });
};

const connectFetch = () => {
  const controller = new AbortController();
  fetchEventSource('', {
    method: 'POST',
    body: JSON.stringify({
      content: '',
    }),
    signal: controller.signal,
    onopen() {
      console.log('open');
    },
    onmessage(event) {
      console.log('onMessage', event.data);
      let data = event.data;
      let jsonData = JSON.parse(data);
    },
    onclose() {
      controller.abort(); // 出错后不要重试
      eventSource.close();
    },
    onerror(error) {
      console.log('close', error);
      controller.abort(); // 出错后不要重试
      eventSource.close();
    },
  });
};
```

以上方法不好用的话，可以用插件(不要重复造轮子)

```shell
npm install @microsoft/fetch-event-source
```

实用

```js
import { fetchEventSource } from '@microsoft/fetch-event-source';

let controller = new AbortController();
const eventSource = fetchEventSource(fetchUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(params),
  signal: controller.signal,
  onopen() {
    console.log('open');
  },
  onmessage(event) {
    console.log('onMessage', event.data);
    let data = event.data;
    let jsonData = JSON.parse(data);
  },
  onclose() {
    controller.abort(); //出错后不要重试
    eventSource.close();
  },
  onerror(error) {
    console.log('close', error);
    controller.abort(); //出错后不要重试
    eventSource.close();
  },
});
```

## 实际开发的坑

实用了 SSE 了， 但是会最后一次性完整的响应了，在浏览器 Network 看，time 一直在 pending 状态，直到数据全部传输完。

可能原因：

可能是被项目开发框架压缩了，比如 Next.js 默认压缩响应，也可能是被腾讯云服务器压缩了。
此时客户端收到的响应头包含字段'Content-Encoding': 'gzip'，证明被压缩了。
解决办法：
客户端的请求头中设置：'Accept-Encoding': 'identity'
API 路由服务的响应头中设置：'Content-Encoding': 'none'
(Content-Encoding 并没有查到有 none 这个合法字段，但是我的项目已经 work 了)

怎么看是否都是设置正确了

看返回头要设置下面几个值

```text
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
Content-Encoding: none
```

请求头

```text
Accept: text/event-stream
```
