# git 版本回退

## reset

通过 reset 的方式，把 head 指针指向之前的某次提交，reset 之后，后面的版本就找不到了

1.在 gitlab 上找到要恢复的版本号，如：

```shell
139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96
```

2.在客户端执行如下命令（执行前，先将本地代码切换到对应分支）

```shell
git reset --hard 139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96
```

3.强制 push 到对应的远程分支（如提交到 develop 分支）

```shell
git push -f -u origin develop
```

## revert

这种方式不会把版本往前回退，而是生成一个新的版本。所以，你只需要让别人更新一下代码就可以了，你之前操作的提交记录也会被保留下来

1.在 gitlab 上找到要恢复的版本号，如：

```shell
139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96
```

2.在客户端执行如下命令（执行前，先将本地代码切换到对应分支）

```shell
git reset --n 139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96
```

3.提交

```shell
git commit -m “版本回退”
```

4.push 到对应的远程分支（如提交到 develop 分支）

```shell
git push origin develop
```
