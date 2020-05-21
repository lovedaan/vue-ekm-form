# emitter / listener
> 表单组件之间事件发送与监听，从而实现组件之间的联动。事件通过广播的方式发送，同一个表单中的其它组件都可以监听来自同一个组件发送的事件。


## 配置

参数  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
emitters | Array | [] | [事件触发配置](#emitters-配置)
listeners | Object | false | [事件监听配置](#listeners-配置)


### emitters 配置

参数  | 类型 | 是否必填 | 说明
:---- | :---- | :---- | :----
trigger | string | 是 | 触发条件，如change。不支持原生事件，必须是组件内$emit触发
event | string | 是 | 事件名称
transfer | function | 否 | 事件触发之前[参数预处理](#transfer)方法

##### 示例
```javascript
{
  key: 'class',
  title: '班级',
  type: 'select',
  options: classes,
  emitters: [{
    trigger: 'change',
    event: 'classChange',
    transfer(item, value) {
      return [classes.find(classItem => classItem.val === value)]
    }
  }]
}
```

#### transfer

触发事件之前对trigger传入的参数进行处理的方法， 如：
```javascript
emitters: [
  {
    trigger: 'change',
    event: 'classChange'
  }
]
```
以上配置会使该组件在触发change事件时在表单内广播classChange事件，所带的值为tranfer返回的值，如果tranfer 未定义，则所带值为change事件回调的参数值。

###### 函数参数

参数  | 类型 | 说明
:---- | :---- | :---- | :----
item | Object |  组件配置
value | Any | trigger事件回调函数的第一个参数

##### 示例
```javascript
{
  key: 'class',
  title: '班级',
  type: 'select',
  options: classes,
  emitters: [{
    trigger: 'change',
    event: 'classChange',
    transfer(item, value) {
      return [classes.find(classItem => classItem.val === value)]
    }
  }]
}
```

### listeners 配置
监听表单内组件广播的事件，key/value键值对

| | 类型 | 说明 | 参数 | 备注
:---- | :---- | :---- | :---- | :----
key | string | 需要广播的事件名称 | / | /
value | function | 是 |  item: 组件配置, [...values]: 事件发送的值，参数个数有具体事件发送者决定 ）| 方法中的this绑定的是表单实例，可以直接通过this.model修改和读取表单内其它组件的值

##### 示例
```javascript
{
  key: 'teacher',
  title: '班主任',
  type: 'input',
  props: {
    disabled: true
  },
  listeners: {
    classChange: function(item, classItem) {
      this.model.teacher = classItem.teacher
    }
  }
}
```

### 自定义组件使用emitters | listeners

自定义组件使用[renderOptions](#renderOptions)配置项替代renderContent，否则会无视emitters | listeners配置。

### renderOptions
该配置项的值会按照vm.$createElement方法的要求传入，所以以下参数请完全参考vm.$createElement官方文档。

配置项  | 说明
:---- | :----
tag | 标签
data | 包含模板相关属性的数据对象
children | 子元素数组

##### 示例

```javascript
[{
  key: 'advice',
  title: '建议',
  emitters: [{
    trigger: 'change',
    event: 'adviceChange'
  }],
  renderOptions(h, item, model) {
    return {
      tag: comp1,
      data: {},
      children: ['请输入你对所选班级的看法和建议']
    }
  }
}]
```
