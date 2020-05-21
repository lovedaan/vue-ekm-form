# datetime
> 日期选择器

## type值
`datetime`

## 默认值
''
## 组件配置

属性配置参考element-ui的DatePicker组件。

### 不支持的 props 配置

<div style="width: 100px">名称</div>  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
default-value | -- | -- | -- | <font color=red>此配置无效，请不要使用。会被[item.defaultValue](/components/)替代</font>。如果item.defaultValue未配置，则会使用['', '']作为默认值。


### 特别说明
props.format配置只能影响显示格式，组件返回的数据格式依旧为Date，如果需要自定义返回格式，请参考[dataType配置](/components/)，示例：

```
```

## 示例：

```javascript
[{
  key: 'begin_end_time',
  title: '入住-退房时间',
  type: 'datetime',
  defaultValue: ['2019-07-01', '2019-07-31'],
  props: {
    type: 'daterange',
    format: 'yyyy-MM-dd',
    rangeSeparator: ' To '
  }
}, {
  key: 'datetime_week',
  title: '结算周',
  type: 'datetime',
  props: {
    type: 'week',
    format: 'yyyy 第 WW 周'
  }
}, {
  key: 'date',
  title: '日期',
  type: 'datetime',
  dataType(value) {
    let date = new Date(value)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
  },
  props: {
    type: 'date',
    format: 'yyyy-MM-dd'
  }
}]
```