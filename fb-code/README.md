# form-build

> A Vue.js project

## 本地开发

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 文档部署

1. 本地安装gitbook
2. 根目录执行
```
npm run pub:doc
```
脚本执行期间要求输入服务器root密码，具体密码联系蔡庆丰，或谢敏

注意：
1. 部署脚本默认只支持linux以及类似系统
2. 如果是windows系统，且刚好你使用vscode编辑器，那么请将terminal改为git bash后再执行上面的命令，修改terminal的具体方法自行百度。
  


## 发布私npm

1. 发布前记得修改package/package.json中的版本号

2. 先部署好文档，因为发布到私有npm中包含文档
  
3. 发布
``` bash
# 执行此命令 1. 代码构建 2. 发布私有npm 3. 代码推送到远程同名仓库
npm run pub
```

发布到私有npm需要的条件参考以下文档
[follow the guide](http://gzgit.bestwehotel.com/app-javascript/document/blob/master/%E4%BD%BF%E7%94%A8%E7%A7%81%E6%9C%89npm.md)

24h内可撤回上次发布的版本：
``` bash
npm unpublish @wehotel/form-build@x.x.x
```

## 一期需求/优化（已结束）

1. 基础组件优化--添加自定义内容组件 （已完成）
2. 基础组件优化--组件的配置优化（已完成）
3. 基础组件优化--图片上传组件与业务解耦（已完成）
4. 功能优化--表单组件联动（已完成）
5. 功能优化--向外暴露表单验证和清除验证方法（已完成）
6. 完善文档（已完成）
7. 一个配置关联多个字段的组件类型格式校验问题（已完成）

## 二期需求

1. 增加列表查询表单组件（已完成）
2. 基础组件优化--添加富文本组件（已完成）
3. 支持针对业务组件的注册，省去render的麻烦（已完成）
4. 把业务强关联的公共自定义组件抽离为“自定义表单”（已完成）

## 三期需求

1. 支持element-UI 2.x版本
2. 表格编辑组件抽象化（已暂停）
3. 表单可视化布局配置（进行中）
4. select组件选项支持更灵活配置
5. 日期范围选择器支持默认
6. 支持颜色选择器
7. 支持checkbox-button组件
8. 选项列表支持动态变化


## 开发手册

### 针对项目的debug方法

遵循以下步骤：

1. 将form-build的代码拉至本地，和项目的根目录同级。
2. 将项目中对form-build的引用改为form-build源代码目录。如果满足上一个步骤的条件，则修改目录为
```
import formBuild from '../../form-build/package/index.js'
```
3. 上一个步骤执行后由于该目录超出了项目目录导致postcss找不到，所以先暂时在src目录下添加一个.postcssrc.js文件，制定不要使用postcss插件，文件内的配置如下：
```
module.exports = {
    // "plugins": {
    //   "postcss-import": {},
    //   "postcss-url": {},
    //   // to edit target browsers: use "browserslist" field in package.json
    //   "autoprefixer": {}
    // }
}
```
调试完删除该文件即可。

