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
