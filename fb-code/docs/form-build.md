# form-build表单生成器组件配置

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