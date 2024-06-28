# git命令

## stash 命令

因为当工作去和暂存区有改动未提交的时候，是不允许切分支的，此时可以用stash进行改动的暂存，暂存过后就可以切分支了。

```shell
git stash list # 列出所有暂存的任务
git stash save '暂存描述' # 把已追踪的改动过的文件暂存
git stash # 暂存已追踪的改动过的文件
git stash -u # 暂存所有改动文件，包括未追踪文件, -u === --included-untracked
git stash -k # 暂存工作区已追踪文件 -k === --keep-index
git stash -a # 暂存所有改动文件，包括未追踪文件和再.gitignore中忽略的文件，慎用，-a === --all
git stash -S # 暂存暂存区的改动，不影响工作区的文件 -S === --staged
git stash show # 默认展示最新的暂存信息，show apply pop drop 命令后面不带具体暂存编号都默认最新
git stash show 0 # 展示第0个（最新）暂存 等同于 git stash show stash@{0}
git stash apply 0 # 应用第0个暂存，不会删除该暂存
git stash pop 0 # 弹出第0个暂存，会应用并删除该暂存
git stash drop 0 # 删除第 0 个暂存
git stash clear # 清除所有暂存
```

stash 运用场景

1. 当本地开发代码还未提交，但发现分支错误的时候，可以先暂存，然后切换分支，再把暂存释放出来，可能会有代码冲突，解决就好
2. 当本地开发新功能但还没开发完，但需要紧急去修复线上bug时，可以先把本地功能暂存起来，然后切换分支去修改bug，修改完再回来继续开发。

## branch 命令

branch是分支相关的命令

```shell
git branch # 查看本地所有分支
git branch -a # 查看所有分支，包括远程分支
git branch -v # 列出分支最后一次提交信息
git branch -vv # 列出所有分支的追踪关系
git branch dev # 基于当前分支创建dev分支
git branch dev main # 基于main分支创建dev分支
git branch -m dev # 修改当前分支名字为dev
git branch -m dev main # 修改dev分支名字为 main
git branch -M dev # 强制修改当前分支名字为dev
git branch -d dev # 删除本地分支，如果要删除的分支有还没合并的commit，删除会失败，这时候可以把 -d 改为 -D
git branch -D dev # 强制删除本地分支
git branch -u origin/master master # 建立修改追踪关系，Git 2.0之后使用, -u === --set-upstream-to
```

## checkout 命令

```shell
git checkout -b dev main # 基于main分支创建dev分支，切检出到dev分支
git checkout main # 切换到main分支
```

## remote 命令

remote 命令用来创建、查看和删除本地仓库与其他代码仓库之间的连接。一个本地仓库可以关联多个远程主机。

```shell
git remote # 列出所有主机名
git remote -v # 列出所有主机名和地址
git remote add origin https://github.com/original/repo.git # 增加远程库，并命名为origin
git remote rm origin # 删除与远程库origin的连接
git remote rename origin upstream # 重命名origin为 upstream
git remote update origin --prune # 更新远程 --prune: 修剪，加该参数可以同步远程被删除的分支，不然不会同步
```

## fetch 命令

同步远程库的内容

```shell
git fetch # 获取远程库的所有更新
git fetch --all # 获取所有远程库的所有更新
git fetch origin # 获取origin远程库的所有分支的更新
git fetch origin master # 获取远程仓库origin分支master的更新
```

## pull 命令

git pull 命令用于从远程获取代码并合并本地的版本。

git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。

```shell
git pull origin master:main # 拉取主机名为origin的远程仓库的master分支和本地分支main分支合并
git pull origin master # 拉取主机名为origin的远程仓库的master分支和当前分支合并
git pull origin # 本地当前分支和远程主机名为origin的分支建立了追踪关系
git pull # 当前分支的追踪关系只有一个
git pull --rebase # 采用rebase模式合并代码
```

## push 命令

```shell
git push origin master:main # 推送本地master分支代码到远程main分支
git push origin master # 本地分支和远程分支同名
git push -u origin master # 推动代码的同时建立分支追踪关系，下次可以直接通过 git pull 命令推送
git push -f # 强制推送，-f === --force
git push # 存在追踪关系可以简写推送命令
git push -d origin  dev # 删除远程dev分支
```

## merge 命令

可以用来合并分支或者某个提交

```shell
git log # 查看commit记录
git merge 3424882b11ddbff05ac5b0b57ad7e40ee98c0cc9 # 合并commitid为 34248...这个提交到当前分支
git merge dev # 合并dev分支到当前分支
```

## rebase命令

变基，可以用来合并提交记录

## cherry-pick 命令

用力合并 commit 提交记录

```shell
git cherry-pick 117aa2 117aa1 117aa2 # 按顺序合并 117aa2 117aa1 117aa2三个commit到当前分支
git cherry-pick 117aa2..7957fd # 合并117aa2到7957fd的提交到当前分支
```
