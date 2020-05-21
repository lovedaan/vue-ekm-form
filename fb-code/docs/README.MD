## Wehotel 后台系统表单生成器
> 依赖于element-ui@1.4.13版本，暂不支持2.x以上的版本，请使用时注意版本。

###  详细文档，请访问[http://172.25.62.87:8006/form-build](http://172.25.62.87:8006/form-build)

### 使用

* 切源 <http://172.25.62.87:10000>
* [私有 npm 使用引导](http://gzgit.bestwehotel.com/app-javascript/document/blob/master/%E4%BD%BF%E7%94%A8%E7%A7%81%E6%9C%89npm.md)
* `npm i -P @wehotel/form-build`

```
// 全局使用
import formBuild from '@wehotel/form-build'
Vue.use(formBuild)

// 局部使用
import formBuild from '@wehotel/form-build'
components: {
    formBuild
}
```

### 快速配置

可通过可视化拖拽快速配置表单字段以及布局信息。

可视化配置地址：[http://172.25.62.87:9977/#/](http://172.25.62.87:9977/#/)

### 支持表单类型
`input` `select` `checkbox` `checkbox-group` `radio` `radio-group` `radio-button-group` `switch` `upload` `upload-list` `datetime` `datetime-group` `cascader`


### Props
名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
formList | Array | [] | 否 | 表单[components](/components/)数组
hideBtnGroup | Boolean | false | 否 | 是否隐藏按钮操作区（提交&取消）
inline | Boolean | false | 否 | 表单样式是否为行内表单
disabled | Boolean | false | 否 | 是否全局禁用
labelWidth | [Number, String] | 100 | 否 | 表单label宽度
labelWidth | [Number, String] | 100 | 否 | 表单label宽度
labelPosition | String | right | 否 | 表单域标签的位置，可选值：right/left/top
labelSuffix | String | - | 否 | 表单域标签的后缀
showMessage | Boolean | true | 否 | 是否显示校验错误信息
contentWidth | [Number, String] | 240 | 否 | 表单内容宽度
model | Object | 默认取formList配置 | 是 | 表单数据对象
enterSubmit | Boolean | false | 否 | 回车按键是否触发表单提交
submitBtnText | String | '提交' | 否 | 提交按钮文案
cancelBtnText | String | '取消' | 否 | 取消按钮文案
hideCancelBtn | Boolean | false | 否 | 
span | Number/String | -- | 否 | 表单项占据的列数(inline=true可用，2.0.1可用)
gutter | Number/String | -- | 否 | 表单项间间隔(inline=true可用，2.0.1可用)

### Slots
名称 | 说明
:---- | :----
prepend | 表单前置插槽
append | 表单内置按钮后置插槽
default | 表单后置插槽（内置按钮前）

### Events
事件名 | 说明 | 参数
:---- | :---- | :----
submit | 提交事件 | model (表单模型)
cancel | 取消事件 | model (表单模型)

### Methods

<div style="width: 100px">方法名称</div>  | <div style="width: 100px">说明</div> | 参数 | 返回值
:---- | :----| :----| :----
validate | 校验表单 | Function(callback: function(model, valid)) | 无callback返回promise， 成功resolve(model)，失败resolve(valid)
resetFields | 重置表单数据为初始值 | - | -
clearValidate | 清除校验 | Function(props: 字段名数组（不传表示全部清除）) | -
submit | 提交表单 | - | 返回promise，表单校验通过就resolve(model)，否则resolve(valid)

### props.formList.item详细配置说明
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
key | String | -- |    字段名，组件关联单个字段
keys | Array | -- |    字段名列表，key配置优先级高于keys。
defaultValue | Any | -- | 字段默认值，若keys生效，则该值必须是Array类型且与keys数组中的字段一一对应。
title | String | -- |    表单label
hide | Boolen/Function(model) | -- | 组件是否隐藏
type | String | -- |     表单类型（String）
dataType | Function | -- | 表单处理value类型，可选Number/String/自定义函数
width | Number | -- | 组件的px宽度（不包含label），覆盖全局的contentWidth。
class | Object | -- | 应用于el-form-item的样式
props | Object | -- | element-ui表单配置项
rule | Array/Object | -- |  表单规则，同官方[element-ui Form表单](https://element.eleme.cn/1.4/#/zh-CN/component/form)有略微区别，具体请看[表单校验](/validate.html)
on | Object | {} | 监听组件内部触发的事件
children | Function(h) | -- | 子节点 返回vNode数组
renderTitle | Function(h, item) | item: 组件配置 | 表单label渲染函数
renderContent | Function(h, item) | item: 组件配置 | 表单内容渲染函数，用于[自定义组件](/components/customer.html)
prepend | Function(h, item) | item: 组件配置 | 控件名称后面，控件内容前面的前置插槽(2.0.5+)
append | Function(h, item) | item: 组件配置 | 控件内容后面的后置插槽(2.0.5+)

[col](#col详细配置说明) | Object | -- | 表单列占位配置(inline=true可用，2.0.1可用)，具体配置见下文

### props.formList.item.col详细配置说明
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
span | Number/String | -- | 表单项占据的列数
offset | Number/String | -- | 表单项左侧的间隔格数
push | Number/String | -- | 表单项向右移动格数
pull | Number/String | -- | 表单项向左移动格数

### 示例
```
<form-build
    :formList = 'formList'
    :labelWidth = '120'
    :contentWidth = '520'
    :hideBtnGroup = true
    @sumbit="submit"
    :model = 'model'>
</form-build>
```

```
data () {
  return {
    model: {},
    formList: [{
      key: 'activityName',
      title: '专题名称',
      type: 'input',
      rule: [{
        type: 'string',
        required: true,
        message: '请填写专题名称',
        trigger: 'blur'
      }],
      append: h => {
        return <span>（不在C端展示，仅作为后台多个专题活动区分，方便搜索）</span>
      }
    }, {
      key: 'effectBeginTime',
      title: '活动时间',
      type: 'datetime-group',
      props: {
        dateType: 'datetime',
        ids: ['effectBeginTime', 'effectEndTime'],
        isUserClearMinute: true,
        isSetStartTime: true
      },
      rule: [{
        required: true,
        message: '请选择活动时间',
        trigger: 'change',
        validator: function (rule, value, callback) {
          let condition = that.model.effectBeginTime && that.model.effectEndTime
          if (!condition) {
            callback(new Error(rule.message))
          }
          callback()
        }
      }]
    }, {
      key: 'title',
      title: '页面标题',
      type: 'input',
      rule: [{
        type: 'string',
        required: true,
        message: '请填写页面标题',
        trigger: 'blur'
      }]
    }, {
      key: 'shareTitle',
      title: '分享标题',
      type: 'input',
      rule: [{
        type: 'string',
        required: true,
        message: '请填写分享标题',
        trigger: 'blur'
      }]
    }, {
      key: 'shareDesc',
      title: '分享文案',
      type: 'input',
      rule: [{
        type: 'string',
        required: true,
        message: '请填写分享文案',
        trigger: 'blur'
      }]
    }, {
      key: 'backgroundColor',
      title: '背景颜色',
      renderContent: (h, item) => {
        return h(colorPicker, {
          props: {
            value: that.model[item.key]
          },
          on: {
            input: value => {
              that.model[item.key] = value
            }
          }
        })
      }
    }, {
      key: 'h5ShareImg',
      title: 'H5分享图',
      type: 'upload',
      props: {
        action: '/mall-admin-web/file/uploadImages.do',
        showFileList: false,
        name: 'images'
      },
      append: h => {
        return <span>提示：图片大小不可超过128k，格式为jpg</span>
      },
      rule: [{
        type: 'string',
        required: true,
        message: '请上传H5分享图',
        trigger: 'change'
      }]
    }, {
      key: 'appletShareImg',
      title: '小程序分享图',
      type: 'upload',
      props: {
        action: '/mall-admin-web/file/uploadImages.do',
        showFileList: false,
        name: 'images'
      },
      append: h => {
        return <span>提示：图片大小不可超过128k，格式为jpg</span>
      },
      rule: [{
        type: 'string',
        required: true,
        message: '请上传小程序分享图',
        trigger: 'change'
      }]
    }]
  }
}
```
