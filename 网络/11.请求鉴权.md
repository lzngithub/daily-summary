# cookie session token

## HTTP 请求是无状态的

什么是无状态呢？就是说这一次请求和上一次请求是没有任何关系的，互不认识的，没有关联的。

## cookie

cookie 是浏览器提供的功能，cookie 其实是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的 cookie。

当网页要发 http 请求时，浏览器会先检查是否有相应的 cookie，有则自动添加在 request header 中的 cookie 字段中。

在 localStorage 出现之前，cookie 被滥用当做了存储工具。什么数据都放在 cookie 中，即使这些数据只在页面中使用而不需要随请求传送到服务端。当然 cookie 标准还是做了一些限制的：每个域名下的 cookie 的大小最大为 4KB，每个域名下的 cookie 数量最多为 20 个（但很多浏览器厂商在具体实现时支持大于 20 个）。

### 格式

字符串格式的，由键值对 key=value 构成，键值对之间由一个分号和一个空格隔开。

例子：

```text
"key=name; expires=Thu, 25 Feb 2016 04:18:00 GMT; domain=ppsc.sankuai.com; path=/; secure; HttpOnly"
```

### 属性

- expires/max-age: 失效时间
- domain: 域名
- path: 路径
- secure: 安全性设置
- httpOnly: 是否允许 js 访问

#### expires/max-age

expires: http/1.0

- 时刻，必须是 GMT 格式的时间（可以通过 new Date().toGMTString()或者 new Date().toUTCString() 来获得）
- 对于失效的 cookie 浏览器会清空。如果没有设置该选项，则默认有效期为 session，即会话 cookie。这种 cookie 在浏览器关闭后就没有了。

max-age: http/1.1

- 以秒为单位时间段, cookie 失效时刻= 创建时刻+ max-age
- 默认值为-1，即有效期为 session，设置为 0 则有效期为删除 cookie，正数为： 创建时刻 + max-age

#### domain/path

这两个放一起讲，domain 是域名，path 是路径，两者加起来就构成了 URL，domain 和 path 一起来限制 cookie 能被哪些 URL 访问。

没有设置这两个选项，domain 的默认值为设置该 cookie 的网页所在的域名，path 默认值为设置该 cookie 的网页所在的目录。

#### secure

secure 选项用来设置 cookie 只在确保安全的请求中才会发送。当请求是 HTTPS 或者其他安全协议时，包含 secure 选项的 cookie 才能被发送至服务器。

默认情况下，cookie 不会带 secure 选项(即为空)。所以默认情况下，不管是 HTTPS 协议还是 HTTP 协议的请求，cookie 都会被发送至服务端。

如果想在客户端即网页中通过 js 去设置 secure 类型的 cookie，必须保证网页是 https 协议的。在 http 协议的网页中是无法设置 secure 类型 cookie 的。

#### httpOnly

这个选项用来设置 cookie 是否能通过 js 去访问。默认情况下，cookie 不会带 httpOnly 选项(即为空)，所以默认情况下，客户端是可以通过 js 代码去访问（包括读取、修改、删除等）这个 cookie 的。当 cookie 带 httpOnly 选项时，客户端则无法通过 js 代码去访问（包括读取、修改、删除等）这个 cookie

在客户端是不能通过 js 代码去设置一个 httpOnly 类型的 cookie 的，这种类型的 cookie 只能通过服务端来设置。

### 设置 cookie

可以通过服务端，服务端返回的 response header 中有设置 set-cookie 字段（可以设置多个 set-cookie 字段），每个字段对应一个 cookie（注意不能将多个 cookie 放在一个 set-cookie 字段中），set-cookie 字段的值就是普通的字符串，每个 cookie 还设置了相关属性选项。

也可以通过客户端，过 js 代码来设置 cookie，但 httpOnly 设置不了

例子

```js
document.cookie =
  "age=12; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=sankuai.com; path=/";
```

要想修改一个 cookie，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新 cookie 时，path/domain 这几个选项一定要旧 cookie 保持一样。否则不会修改旧值，而是添加了一个新的 cookie。

删除一个 cookie 也挺简单，也是重新赋值，只要将这个新 cookie 的 expires 选项设置为一个过去的时间点就行了。但同样要注意，path/domain/这几个选项一定要旧 cookie 保持一样。

### 跨域请求中 cookie

在发生跨域时，cookie 作为一种 credential 信息是不会被传送到服务端的。必须要进行额外设置才可以。

在 CORS 标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息（credentials）如"cookies"和"HTTP authentication schemes"。除非 xhr.withCredentials 为 true（xhr 对象有一个属性叫 withCredentials，默认值为 false）。

cookies 是一种认证信息，在跨域请求中，client 端必须手动设置 xhr.withCredentials=true，且 server 端也必须允许 request 能携带认证信息（即 response header 中包含 Access-Control-Allow-Credentials:true），这样浏览器才会自动将 cookie 加在 request header 中。

另外，要特别注意一点，一旦跨域 request 能够携带认证信息，server 端一定不能将 Access-Control-Allow-Origin 设置为\*，而必须设置为请求页面的域名。

## session 和 cookie

由于 http 的无状态性，为了使某个域名下的所有网页能够共享某些数据，session 和 cookie 出现了。客户端访问服务器的流程如下

- 首先，客户端会发送一个 http 请求到服务器端。
- 服务器端接受客户端请求后，建立一个 session，并发送一个 http 响应到客户端，这个响应头，其中就包含 Set-Cookie 头部。该头部包含了 sessionId。Set-Cookie 格式如下，具体请看 Cookie 详解 Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]
- 在客户端发起的第二次请求，假如服务器给了 set-Cookie，浏览器会自动在请求头中添加 cookie
- 服务器接收请求，分解 cookie，验证信息，核对成功后返回 response 给客户端

注意

- cookie 只是实现 session 的其中一种方案。虽然是最常用的，但并不是唯一的方法。禁用 cookie 后还有其他方法存储，比如放在 url 中
- 现在大多都是 Session + Cookie，但是只用 session 不用 cookie，或是只用 cookie，不用 session 在理论上都可以保持会话状态。可是实际中因为多种原因，一般不会单独使用
- 用 session 只需要在客户端保存一个 id，实际上大量数据都是保存在服务端。如果全部用 cookie，数据量大的时候客户端是没有那么多空间的。
- 如果只用 cookie 不用 session，那么账户信息全部保存在客户端，一旦被劫持，全部信息都会泄露。并且客户端数据量变大，网络传输的数据量也会变大

## token

token 也称作令牌，由 uid+time+sign[+固定参数]，token 的认证方式类似于临时的证书签名, 并且是一种服务端无状态的认证方式

token 在客户端一般存放于 localStorage，cookie，或 sessionStorage 中，服务端不需要存储

token 认证流程：

- 用户登录，成功后服务器返回 Token 给客户端。
- 客户端收到数据后保存在客户端
- 客户端再次访问服务器，将 token 放入 headers 中
- 服务器端采用 filter 过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

## token 相较于 seesion 的优点

- token 可以抵抗 csrf，cookie+session 不行
- 我们已经知道 session 时有状态的，一般存于服务器内存或硬盘中，当服务器采用分布式或集群时，session 就会面对负载均衡问题。而 token 是无状态的，token 字符串里就保存了所有的用户信息
- 减轻了服务器的需要保存用户登录信息的压力
