# cascader
> 级联选择器

## type值
`cascader`

## 默认值

默认值为空数组[]

## 配置

支持element-UI定义的所有属性配置。


## 代码示例

```javascript
{
  key: 'cascader_menu',
  title: '菜单',
  type: 'cascader',
  props: {
    filterable: true,
    changeOnSelect: true,
    options: [{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [...]
      }, {
        value: 'daohang',
        label: '导航',
        children: [...]
      }]
    }]
  }
}

```