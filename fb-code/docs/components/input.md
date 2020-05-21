# input
> 输入框组件

## type值
`input`

## 默认值

空字符串

## 组件配置

名称  | 类型 | 参数 | 返回值 | 说明
:---- | :---- | :---- | :---- | :----
slots | Function | (h, item, model)| vNode(s) | 组件内插槽（2.3.2+）

## 示例：
```javascript
{
  key: 'input_title',
  title: 'url地址',
  type: 'input',
  props: {
    maxlength: 40
  },
  slots: (h) => {
    return [(<template slot="prepend">Http://</template>), (<el-button slot="append" icon="search"></el-button>)]
  },
  rule: [...]
}
```
