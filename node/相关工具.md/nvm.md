# nvm

是node的版本管理工具

## 安装

### linux安装

可以通过命令安装

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash # 安装nvm
```

安装完需要重新启动终端，或者通过下面的命令来更新nvm路径

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion
```

## 相关命令

```shell
nvm --help //查看常用命令
nvm list/ls //查看本机安装的所有的node版本
nvm use <版本号> //切换版本
```