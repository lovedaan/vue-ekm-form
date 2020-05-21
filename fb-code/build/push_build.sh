#!/usr/bin/expect -f

# 确保脚本抛出遇到的错误
set -e
cd ./dist

echo "----------准备发布到私有npm----------"
npm publish
echo "----------已经发布到私有npm----------"

echo "----------准备提交git仓库代码----------"
cd ../
git add .
read -p $'Please enter git commit message: \n'
git commit -m "$REPLY"
git push origin
echo "----------已提交git仓库代码----------"
