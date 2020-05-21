# select
> 单选框

## type值
`select`

## 默认值
""

### props

支持element-UI定义的所有属性配置。

### 选项
名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
options | Array | [] | 否 | 复选框组选项, 每一项包含label, val, disabled三个属性，分别对应el-checkbox的text, label, disabled属性


#### 示例：
```javascript
{
  key: 'select_class',
  title: '班级',
  type: 'select',
  editable: true,
  props: {
    disabled: true
  },
  options: [{
    label: '一班',
    val: 1,
    leader: '苏小雨',
    teacher: '王大锤',
    disabled: true
  }, {
    label: '二班',
    val: 2,
    leader: '马飞',
    teacher: '鱼灵'
  }, {
    label: '三班',
    val: 3,
    leader: '丹尼尔',
    teacher: '哈尔'
  }]
}
```