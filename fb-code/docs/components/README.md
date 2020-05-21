form-build支持以下组件类型：

`input` `select` `checkbox` `checkbox-group` `radio` `radio-group` `radio-button-group` `switch` `upload` `upload-list` `datetime` `datetime-group` `cascader` `editor`

### 基础配置
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
key | String | -- |    字段名，组件关联单个字段
keys | Array | -- |    字段名列表，key配置优先级高于keys。
defaultValue | Any | -- | 字段默认值，若keys生效，则该值必须是Array类型且与keys数组中的字段一一对应。
title | String | -- |    表单label
hide | Boolen/Function(model) | -- | 组件是否隐藏
type | String | -- |     表单类型（String）
dataInType | Function | -- | 处理组件具有初始化value值的类型，可选Number/String/自定义函数（v2.4.1+）
dataType | Function | -- | 处理组件输出value类型，可选Number/String/自定义函数
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


### 非基础配置

针对特定组件类型，有特定的额外配置，详情查看组件专属文档。

### col配置
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
span | Number/String | -- | 表单项占据的列数
offset | Number/String | -- | 表单项左侧的间隔格数
push | Number/String | -- | 表单项向右移动格数
pull | Number/String | -- | 表单项向左移动格数

### Emitter & Listener

表单组件之间发送和接收事件，具体请查看文档[emitter-listener](/emitter-listener.html)

### 示例：

```javascript
{
  key: 'checkbox_group_type',
  title: '教师角色',
  type: 'checkbox-group',
  editable: true,
  defaultValue: [3],
  dataType: Number,
  class: {
    'inline-block': true
  },
  hide(model) {
    return !model.checbox_group_role || !model.checbox_group_role.includes(2)
  },
  props: {
    style: {
      display: 'inline-block'
    }
  },
  rule: [{
    validator (rule, value, callback) {
      if (!value || !value.length) {
        callback(new Error('至少选择一项'))
      } else {
        callback()
      }
    },
    trigger: 'change',
    required: true
  }],
  options: [{
    val: 1,
    label: '班主任'
  }, {
    val: 2,
    label: '英语老师'
  }, {
    val: 3,
    label: '化学老师'
  }]
}
```