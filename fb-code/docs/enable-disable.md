# 组件启用/禁用(2.3.0+)

组件的禁用状态由以下2个条件决定：

* 全局disabled（form-build组件的props）
* 组件级别的disabled（item.prop.disabled）

全局disabled 优先级高于item.prop.disabled

* 全局disabled为true，组件无视item.prop.disabled配置
* 全局disabled为false，item.prop.disabled决定

现在，我们有一种应用场景：

> 某些表单需要谨慎修改，初始化为全局禁用状态，修改某个字段之前需要将对应组件切换为启用状态，修改结束再切换为禁用状态。

本功能即是为了解决该应用场景。

## 使用方式

### 前提

全局禁用开启

### form-build配置

名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
editTrigger | Object | - | 否 | 全局启用/禁用按钮配置


### component item 配置

名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
editTrigger | Object | - | 否 | 组件启用/禁用按钮配置，同上，只不过该配置只是组用于该组件
editable | Boolean | false | 否 | 全局禁用的情况下，该组件是否可切换编辑状态，默认不可编辑


#### editTrigger配置


启用/禁用按钮配置，默认为el-icon-edit（启用）和el-icon-check（禁用）2个图标。

只支持配置文字和修改图标，以及span的样式。

属性名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
enableText | String | - | 否 | 启用按钮文案
disableText | String | - | 否 | 保存按钮文案。点击该按钮会对该组件进行格式校验，校验失败不会切换状态
class | Object | - | 否 | 按钮样式配置
style | Object | - | 否 | 按钮样式配置

## 关于自定义组件

有3个关键点：

1. 组件要配置item.key或者item.keys（告诉组件要校验哪些字段）
2. 组件内部的启用/禁用状态自行处理

###### 示例：

```javascript
{
  keys: ['pay', 'discount'],
  title: '满减优惠',
  required: true,
  editable: true,
  renderContent (h, item, model) {
    return h(multiple, {
      props: {
        pay: model.pay,
        discount: model.discount,
        rule: [...],
        disabled: item.props.disabled // form-build内部已计算好item.props.disabled的值
      },
      on: {
        ...
      }
    })
  }
}
```

## 代码示例

  * [基本组件](http://gzgit.bestwehotel.com/app-javascript/form-build/blob/master/src/model/checkbox.config.js)
  * [组件自定义配置按钮](http://gzgit.bestwehotel.com/app-javascript/form-build/blob/master/src/model/datetime.config.js)
  * [自定义组件](http://gzgit.bestwehotel.com/app-javascript/form-build/blob/master/src/model/customer.config.js)

