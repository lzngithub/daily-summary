# npm 安装策略

## npm2 

npm2 安装依赖的时候比较简单直接，直接按照包依赖的树形结构下载填充本地目录结构，也就是嵌套的 node_modules 结构，直接依赖会平铺在 node_modules 下，子依赖嵌套在直接依赖的 node_modules 中。

比如项目依赖了 A 和 C，而 A 和 C 依赖了相同版本的 B@1.0，而且 C 还依赖了 D@1.0.0，

```text
node_modules
├── A@1.0.0
│   └── node_modules
│       └── B@1.0.0
└── C@1.0.0
    └── node_modules
        └── B@1.0.0
        └── D@1.0.0
```

可以看到同版本的 B 分别被 A 和 C 安装了两次。

如果依赖的层级越多，且依赖包数量越多，久而久之，就会形成嵌套地狱。

## npm3 之后

扁平化嵌套、不确定性、依赖分身、幽灵依赖

针对 npm2 存在的问题，npm3 提出新的解决方案，将依赖进行展平，也就是扁平化。

npm v3 将子依赖「提升」(hoist)，采用扁平的 node_modules 结构，子依赖会尽量平铺安装在主依赖项所在的目录中。

举个例子，项目依赖了 A 和 C，而 A 依赖了 B@1.0.0，而且 C 还依赖了 B@2.0.0：

```text
node_modules
├── A@1.0.0
├── B@1.0.0
└── C@1.0.0
     └── node_modules
          └── B@2.0.0
```

可以看到 A 的子依赖的 B@1.0 不再放在 A 的 node_modules 下了，而是与 A 同层级。而 C 依赖的 B@2.0 因为版本号原因还是放到了 C 的 node_modules 下。

这样不会造成大量包的重复安装，依赖的层级也不会太深，解决了依赖地狱问题。


那为什么不把 B@2.0.0 提到 node_modules 而是 B@1.0.0 呢？而且将 B 直接提取到我们的 node_modules，是不是意味着我们可以在代码直接引用 B 包？由此引出我们下面的问题：

### 依赖提取顺序

源码中，npm 其实会调用一个叫做 localeCompare 的方法对依赖进行一次排序，实际上就是字典序在前面的 npm 包的底层依赖会被优先提出来。

### 是否可以直接使用

先回答问题，可以，这个叫做幽灵依赖，也就是我的 package.json 没有指明这个包，但实际项目使用了这个包，且这个包因为扁平化嵌套导致了可以直接使用，也就是非法访问，最经常碰到的就是 dayjs 这个包。

比如我的项目使用了 arco，但是 arco 的子依赖有 dayjs，那么根据扁平化，dayjs 就会被放在 node_modules 的首层。

但是存在很大的问题，一旦 arco 去掉了这个子依赖，那么我们的代码就直接报错了。

### 依赖分身

假设继续再安装依赖 B@1.0 的 D 模块和依赖 @B2.0 的 E 模块，此时：

```text
node_modules
├── A@1.0.0
├── B@1.0.0
├── D@1.0.0
├── C@1.0.0
│    └── node_modules
│         └── B@2.0.0
└── E@1.0.0
      └── node_modules
           └── B@2.0.0
```

可以看到 B@2.0 会被安装两次，实际上无论提升 B@1.0 还是 B@2.0，都会存在重复版本的 B 被安装，这两个重复安装的 B 就叫 doppelgangers。

而且虽然看起来模块 C 和 E 都依赖 B@2.0，但其实引用的不是同一个 B，假设 B 在导出之前做了一些缓存或者副作用，那么使用者的项目就会因此而出错。

## npm 安装步骤

1. 检查配置： 读取 npm config 和 .npmrc 配置，比如配置镜像源。
2. 确定依赖版本，构建依赖树：检查是否存在 package-lock.json。若存在，进行版本比对，处理方式和 npm 版本有关，根据最新 npm 版本处理规则，版本能兼容按照 package-lock 版本安装，反之按照 package.json 版本安装；若不存在，根据 package.json 确定依赖包信息。
3. 检查缓存或下载：判断是否存在缓存。若存在，将对应缓存解压到 node_modules 下，更新 package-lock.json；若不存在，则下载资源包，验证包完整性并添加至缓存，之后解压到 node_modules 下，生成 package-lock.json。

npm存在下面的问题：安装速度慢，没有解决扁平化带来的算法复杂性、幽灵依赖等本质问题；

### 为什么需要package-lock.json

是在npm5之后才提出来的，从上面MDN的介绍来看，它的出现主要是为了解决依赖的版本管理问题。

* 某些依赖项自上次安装以来，可能已发布了新版本 。比如：A 包在团队中第一个人安装的时候是 1.0.5 版本，package.json 中的配置项为 A: '^1.0.5'，团队中第二个人把代码拉下来的时候，A 包的版本已经升级成了 1.0.8，根据 package.json 中的 semver-range version 规范，此时第二个人 npm install 后 A 的版本为 1.0.8，可能会造成因为依赖版本不同而导致的 bug
* 针对上面的问题，可能有的小伙伴会觉得把 A 的版本号固定为 A: '1.0.5' 不就可以了吗？但是这样的做法其实并没有解决问题， 比如 A 的某个依赖在第一个人下载的时候是 2.1.3 版本，但是第二个人下载的时候已经升级到了 2.2.5 版本，此时生成的 node_modules 树依旧不完全相同 ，固定版本只是固定来自身的版本，依赖的版本无法固定

### 认识package-lock.json

一些常见字段

* lockfileVersion：一个整数版本，从1开始，该文档的版本号
* resolved：依赖的安装地址，其实就是一个包下载地址
* intergrity：表示解压的完整性 Hash 值
* dev：表示该模块是否为顶级模块的开发依赖或者是一个的传递依赖关系
* requires：依赖包所需要的所有依赖项,对应依赖包 package.json 里 dependencices 中的依赖项

### package-lock.json什么时候会变？

开发过程中是不是经常遇到这个文件冲突的，自己明明没改这个文件为啥会冲突？那是因为我们的一些操作会影响到该文件的内容，比如：

* package-lock.json在npm install的时候会自动生成，不同的npm和node版本在install的时候，可能会更改；
* 当我们修改依赖位置，比如将部分依赖从开发依赖改成生产依赖，虽然整体上的依赖并未改变，但是也会影响 package-lock.json中依赖的 dev 字段
* 如果我们切换npm镜像时，执行 npm install 时也会修改 package-lock.json，因为它是会记录我们的依赖包地址的(resolved)
* 当我们更新增加卸载某个包的版本的时候，也会修改 package-lock.json

可以通过命令产看项目依赖关系

```sh
npm list --depth 0
```

## yarn

yarn并行安装，安装分为下面五个流程

* Validating package.json（检查 package.json）：检查运行环境。
* Resolving packages（解析包）：整合依赖信息。
* Fetching packages（获取包）：获取依赖包到缓存中。
* Linking dependencies（连接依赖）：复制依赖到 node_modules。
* Building fresh packages（构建安装）：执行 install 阶段的 scripts。

## 当发生版本冲突的解决办法

1. 统一node和npm版本
2. 手动指定发生冲突的版本

## npm 修改源地址

全局修改：

```shell
npm config set registry https://registry.npmmirror.com/
```

本地修改，在npm运行目录下新建 .npmrc 文件，文件写入

```sh
registry=https://registry.npmmirror.com/
```









