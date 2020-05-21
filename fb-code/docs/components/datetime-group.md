# datetime-group
> 起始结束时间选择器

## type值
`datetime-group`

## 默认值
["", ""]

## 配置

### props
支持element-UI定义的所有属性。除此之外还有以下配置：

名称  | 类型 | <div style="width: 200px">默认值</div> | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
isShowClear | Boolean | true | 否 | 是否显示清除按钮
dateType | String | `datetime` | 否 | 支持`date` 和`datetime`
formatStr | String |  | 否 | 日期/时间格式，支持`yyyy-MM-dd HH:mm:ss`<br>`yyyy-MM-dd`
ids | Array[String] | [] | 是 | 起始、结束时间字段名<font color=red>（2.2+已废弃，请使用item.keys）</font>
placeholders |  Array[String] | ['开始时间', '结束时间'] | 否 | 起始、结束输入框的placeholder
isSetStartTime |  Boolean | false | 否 | 是否设置今天之前的日期不可选
isSetEndTime |  Boolean | false | 否 | 是否设置今天之后的日期不可选
isUserClearMinute |  Boolean | false | 否 | 时间是否设置整点

## 示例

```javascript
{
  title: '有效时间',
  type: 'datetime-group',
  required: true,
  keys: ['effectBeginTime', 'effectEndTime'],
  props: {
    dateType: 'datetime',
    // ids: ['effectBeginTime', 'effectEndTime'], // 2.2+已废弃
    isUserClearMinute: true,
    isSetStartTime: true,
  },
  rule: [{
    required: true,
    type: 'number',
    message: '请选择时间',
    trigger: 'change'
  }]
}
```