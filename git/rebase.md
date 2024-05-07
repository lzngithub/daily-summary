# rebase

变基，两个作用

1.合并分支

2.合并 commit

## 合并分支

合并两条分支变为一条分支

主分支 main

```text
A --> B --> C
```

开发分支 dev

```text
A --> B --> D --> E
```

运行命令

```shell
git rebase main
```

就会形成这样的提交记录

```text
A --> B --> C --> D --> E
```

实际上 git 会先把 dev 上的 commit 与 main 分支对比，把 dev 上不同于 main 的 commit 取消掉，然后将其保存为 patch 文件，存放在临时文件夹.git/rebase 下

然后把 main 分支上的 commit 合并到 dev 上

接着对.git/rebase 下的每个 commit，逐个合并到 dev 上，每个 commit 的合入都可能有冲突，需要手动解决冲突。解决后执行一下命令，完成当前 commit 的合入。重复这个步骤知道所有 commit 都合入，就完成整个 rebase 过程了。

## 合并 commit

实际上，如果你的 commit 数量比较多，那么做 rebase 处理时可能会比较痛苦，尤其是多个 commit 中还对同一文件做了修改，就要解决多个冲突，这个时候可以把本地上的 commit 合并成一个 commit

你的分支 dev

```text
A --> B --> C --> D --> E
```

你的 D E 提交你想合并成一个

可以运行

```shell
git rebase -i head~2 # 最近两次的提交
```

也可以运行

```shell
git rebase -i 倒数第三次的commit id # 可以通过git log 命令查看commit id
```

执行后进入 vi 编辑模式

```shell
pick ff83e00 feat: store用法
pick 3389add feat: 测试rebase

# Rebase d4f5c27..3389add onto d4f5c27 (2 commands)
```

默认情况下为 p(pick)，使用该 commit。把需要合并的改为 s(squash)，会保留合并信息，也可以改为 f，不保留 commit 信息，s 和 f 都是该 commit 挤压向前一个提交

```shell
pick ff83e00 feat: store用法
s 3389add feat: 测试rebase

# Rebase d4f5c27..3389add onto d4f5c27 (2 commands)
```

保存退出，紧接的进入 commit 提交，正常 commit 就会变成下面的提交了

```text
A --> B --> C --> F
```

中途退出 rebase

```shell
git rebase --abort
```

## 总结

你自己的开发分支可以用 rebase 可以把多个 commit 合并成一个提交记录，这样当你把你的开发的功能提交到主分支的时候就是干干净净的。

对于已经主分支已经提交了的 commit 就不要使用 rebase，不然你变基了别人拉代码的时候会出问题。

对于代码修复的的 bug 分支合并的时候，要保留改 bug 的一些信息，这个时候不要用 rebase

rebase 时候会造成混论的时间线，提交记录不再按时间去顺序排序了。
