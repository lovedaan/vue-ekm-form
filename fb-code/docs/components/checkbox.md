# checkbox
> 多选框组件

## type值
`checkbox`

## 默认值
false

## 配置

支持element-UI 的所有属性。此外，还有以下配置：

名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
text | String | '' | 是 | 复选框选项内容

#### 示例

```javascript
{
  key: 'checbox',
  title: '复选框',
  type: 'checkbox',
  text: '选项1',
  props: {
    trueLabel: 1,
    falseLabel: 2,
    checked: true,
    disabled: false
  }
}
```
# checkbox-group
> 多选框组

## type值
`checkbox-group`

## 默认值
[]

### props
支持element-UI 的所有属性，此外还有以下属性：

名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
disabled | Boolean | false | 否 | 禁用多选框组，所有选项都不可变更


### 选项
名称  | 类型 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
options | Array | [] | 否 | 复选框组选项, 每一项包含label, val, disabled三个属性，分别对应el-checkbox的text, label, disabled属性

#### 示例

```javascript
{
  key: 'checkbox_group_type',
  title: '教师角色',
  type: 'checkbox-group',
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
