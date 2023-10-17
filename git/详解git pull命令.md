# git pull

- git pull 命令等价于：先执行 git fetch，再执行 git merge FETCH_HEAD 将远程仓库对应分支的最新提交合并到当前本地分支中。
- git fetch 会查询 git remote 中所有的远程仓库所包含分支的最新提交，并将其记录到.git/FETCH_HEAD 文件中。
- .git/FETCH_HEAD 是一个版本链接，指向着目前已经从远程仓库取下来的所有分支的最新提交。
