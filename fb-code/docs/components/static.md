# static
> 自定义静态组件，只作为静态内容显示，不作为表单校验的一部分，无需指定key，只需要定义renderContent方法即可。

## type值
`static`

### 组件配置
方法名 | 类型 | 说明 | 参数 | 返回值
:---- | :----| :----| :----| :----
renderContent | Function | 渲染内容 | (h, item, model) | vnode

### 示例：

```
{
  type: 'static',

  renderContent (h, item, model) {
    return h(title, {
      props: {
        title: '自定义内容组件示例'
      }
    }, [
      h('span', {
        slot: 'append'
      }, ['（不参与表单校验，提交，组件联动）'])
    ])
  }
}
```

