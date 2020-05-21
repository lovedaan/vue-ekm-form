#!/usr/bin/expect -f

# 确保脚本抛出遇到的错误
set -e
cd ./docs
# 重新生成文档
gitbook build
cd _book
# 将文档推到远程服务器
scp -r * root@172.25.62.87:/opt/form-build/