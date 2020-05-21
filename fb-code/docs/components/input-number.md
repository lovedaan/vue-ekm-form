# input-number
> 数字输入框组件

## type值
`input-number`

## 默认值
null

### 示例：
```javascript
{
  key: 'input_number_age',
  title: '年龄',
  type: 'input-number',
  props: {
    min: 1,
    max: 150,
    size: 'large',
    controls: false,
    debounce: 1000
  },
  rule: [{
    type: 'number',
    required: true,
    message: '请填写年龄',
    trigger: 'blur'
  }]
}
```