<!-- deprecated -->
# 列表模板（版本2.1.1+）

> 那些依赖于form-build的高度复用，但是又高度灵活的代码，是不适合作为第三方组件化的。通过指令生成模板到项目中，一方面减少了项目之间拷贝代码的繁琐操作，另一方面生成的代码作为项目内的业务代码可以通过修改满足项目的特定需求。

目前包含以下模板：

1. 列表mixin

  生成用于列表页面的mixin，该mixin承担了 筛选条件， 列表分页，接口请求的业务逻辑。

## 使用方式

1. 第一步：npm 安装 form-build
2. 第二步：给项目的package.json文件添加以下script

```json
{
  "gen:lpm": "cross-env template=list-page-mixin node node_modules/@wehotel/form-build/gen.js"
}
```

其中，template=list-page-mixin表示生成list-page-mixin模板到项目中。如果是

目前可选的模板名称有如下选项:

  * list-page-mixin


'template'默认值是'list-page-mixin'，所以默认情况简写如下：
```json
{
  "gen:lpm": "node node_modules/@wehotel/form-build/gen.js"
}
```

3. 第三步：指定生成目录

第二步执行时会提示输入生成目录。该目录相对于node_modules的父级目录。 默认值为 'src/mixins/list-page-mixin'

当命令行输出"Complete successfully!"就表示生成生成。