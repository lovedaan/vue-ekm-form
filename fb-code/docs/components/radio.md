# radio
> 单选框

## type值
`radio`

## 默认值
false

## 组件配置

支持element-UI定义的所有属性配置。此外，还有以下配置：

名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
text | String | -- | 是 | 选项名称

#### 示例：
```javascript
{
  key: 'radio_boolean',
  title: '开关',
  type: 'radio',
  text: '开启',
  props: {
    label: 1
  }
}
```

# radio-group 
> 单选框组

## type值
`radio-group`

## 组件配置

支持element-UI定义的所有配置。此外，还有以下配置：

名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
options | Array | []' | 否 | 单选框组选项, 每一项包含label, val, disabled三个属性，分别对应el-radio的text, props.label, props.disabled属性

#### 示例：
```javascript
{
  key: 'radio-group_type',
  title: '学校类型',
  type: 'radio-group',
  options: [{
    val: 1,
    label: '公立'
  }, {
    val: 2,
    label: '私立'
  }],
  rule: [{
    type: 'number',
    required: true,
    message: '请选择展示位置',
    trigger: 'change'
  }]
}
```

# radio-button-group

> 单选框按钮组

配置同radio-group，只是选项以按钮的形式显示。

#### 代码示例

```javascript
{
  key: 'radio-group_city',
  title: '城市',
  type: 'radio-button-group',
  options: [{
    val: 1,
    label: '北京'
  }, {
    val: 2,
    label: '上海'
  }, {
    val: 3,
    label: '深圳'
  }]
}
```

