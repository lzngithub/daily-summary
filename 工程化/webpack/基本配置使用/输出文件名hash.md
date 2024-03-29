# 输出文件名 hash

一般部署前端项目的时候，会启动服务器前端静态资源缓存，这样浏览器就可以缓存住项目中的静态资源，后续就不用请求服务器资源，可以提升响应速度。

但是会存在问题，就是在过期时间内，应用重新部署更新了，文件名没变的话，浏览器那边是得不到更新的。

这个时候可以采用输出文件名 hash，当文件有变动的时候，输入文件的的 hash 会变化，对于浏览器来说新的文件名就是新的请求，就不存在缓存的问题。

## hash 的类型

通过占位符会文件名设置 hash，hash 的类型有三种

hash 的类型有三种

- [hash]：项目级别的 hash，项目有变动 hash 就会变
- [chunkhash]：chunk 级别的 hash，chunk 指的是分包后不同的包
- [contenthash]：文件级别的 hash，根绝文件内容生成的 hash，文件内容变了 hash 会变，解决缓存问题推荐用法。

同时可以通过以下方式控制 hash 长度

- [content:8]：生成 8 位长度的 hash

随便提一下其他的一些占位符：

- [ext]：使用之前的文件扩展名
- [query]：添加之前的 query 参数
