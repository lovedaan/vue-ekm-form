# 注册自定义组件

> 某些组件不在form-build中，但是可复用度十分高。这种情况下，可以将这个可复用度高的组件注册为form-build的内部组件。[自定义组件](/components/customer.html)虽然也能实现该场景的需求，但是，相比于不断的写render函数而言，注册自定义组件更加一劳永逸。

## 使用步骤

### 第一步 编写符合规则的自定义组件

自定义组件向外暴露一个配置对象
###### 示例：

```javascript
export default {
  type: 'product-select',
  defaultValue: 0,
  generate (h, item) {
    return {
      tagName: 'tagName',
      props: item.props || {},
      children: [],
      className: '',
      nativeOn: ''
    }
  }
}

```

对这几种字段进行说明：

名称  | 类型 | 描述 | 默认值 | 是否必须 | 说明
:---- | :---- | :---- | :---- | :---- | :----
type | String |组件类型 | 无 | 是 | 该值需要和form-build内部的类型区分开。目前form-build内部支持的参考[类型](components/)
defaultValue | Any |组件默认值 | 无 | 否 | 组件初始化的默认值
[generate](#generate配置) | Function | 返回渲染组件需要的配置对象 | 无 | 是 | 用于render函数

#### generate配置

函数返回Object，用于render，具体配置如下：

名称  |  类型 | 描述 | 默认值 | 是否必须
:---- | :---- | :---- | :---- | :----
tagName |  String | 组件标签 | 无 | 必须
props |  Object | 传递给组件内部的props | 无 | 否
children | Array/String/Object | 该组件的子节点vNodes | 无 | 否
className | string/object |  绑定到组件上的class | 无 | 否
nativeOn | Object | 监听组件上原生事件 | 无 | 否

### 第二步 在注册form-build之前，引入自定义的组件，并注册在form-build上

form-build暴露了一个register方法用来注册自定义组件。

###### 用法：

```javascript
register(comp1, comp2, ...)
```

###### 示例：

```javascript
import discountCeil from './components/form-build/discount-ceil'
import products from './components/form-build/products'
import formBuild, { register } from '../package/index.js'

register(discountCeil, products)

Vue.use(formBuild)
```

### 第三步 将已注册的组件视为普通的内部组件使用

###### 示例:
```javascript
{
  title: '添加商品',
  type: 'product-select',
  keys: ['extraProperties', 'products'],
  defaultValue: [[], []]
}
```

