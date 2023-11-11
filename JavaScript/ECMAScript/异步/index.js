function promisify(fn, manyResult = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function cb(err, ...result) {
        if (err) {
          reject(err);
        } else {
          resolve(manyResult ? result : result[0]);
        }
      }
      args.push(cb);
      fn.call(this, ...args);
    });
  };
}
