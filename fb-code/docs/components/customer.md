# 自定义组件

> 组件内容自定义，具体情况分为多个字段和单个字段。

## type值
无

## 默认值

无默认值

## 使用方式
可以使用类似基本组件的配置方式，条件是，组件内部需要emit事件已通知表单获取最新值：

### 一、组件仅关联一个字段

#### 示例

组件配置：
```javascript
{
  key: 'color',
  title: '自定义颜色',
  rule: [{
    required: true,
    validator: (rule, value, callback) => {
      if (!/^#/.test(value)) {
        callback(new Error('颜色值必须是以#开头的字符串'))
      } else {
        callback()
      }
    }
  }],
  renderContent (h, item, model) {
    return h(single, {
      props: {
        value: item.value
      },
      on: {
        change(value) {
          model.color = value
        }
      }
    })
  }
}
```
组件模板：
```html
<template>
  <div class="single">
    <el-input v-model="curColor" @change="handleChange"></el-input>
    <span :style="{color: curColor}">我填的颜色</span>
  </div>
</template>
<script>
/**
 * 控制单个字段的自定义组件
 */
export default {
  data() {
    return {
      curColor: ''
    }
  },
  props: {
    value: {
      default: 'red'
    }
  },
  watch: {
    value(val, newVal) {
      this.curColor = val
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
```
### 二、组件关联多个字段

#### 示例

> (2.1.0+可用)

配置部分：
```javascript
{
  keys: ['pay', 'discount'],
  title: '满减优惠',
  renderContent (h, item, model) {
    return h(multiple, {
      props: {
        pay: model.pay,
        discount: model.discount
      },
      on: {
        payChange(value) {
          model.pay = value
        },
        discountChange(value) {
          model.discount = value
        }
      }
    })
  }
}
```
组件部分：
```html
<template>
  <div class="muptiple">
    <span>满</span>
    <el-input type="number" v-model="curPay" @change="payChange"></el-input>
    <span>减</span>
    <el-input type="number" v-model="curDiscount" @change="discountChange"></el-input>
  </div>
</template>
<script>
/**
 * 控制多字段的自定义组件
 */
export default {
  data() {
    return {
      curPay: null,
      curDiscount: null
    }
  },
  props: {
    pay: {
      type: Number,
      default: 100
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  watch: {
    pay: {
      immediate: true,
      handler(val, newVal) {
        this.curPay = val
      }
    },
    discount: {
      immediate: true,
      handler(val, newVal) {
        this.curDiscount = val
      }
    }
  },
  methods: {
    payChange(val) {
      this.$emit('payChange', val)
    },
    discountChange(val) {
      this.$emit('discountChange', val)
    }
  }
}
</script>
<style>
.muptiple .el-input {
  width: 200px;
}
</style>
```

### 三、简单粗暴的使用方式

#### 示例

某些情况下，子组件太复杂导致基本组件的配置方式写法太过繁杂，可以将model直接交给自定义组件内部。

配置部分：
```javascript
{
  title: '满减优惠2',
  renderContent (h, item, model) {
    return h(multiple2, {
      props: {
        model: model
      }
    })
  }
}
```
组件部分：
```html
<template>
  <div class="muptiple">
    <span>满</span>
    <el-input type="number" v-model="curPay" @change="payChange"></el-input>
    <span>减</span>
    <el-input type="number" v-model="curDiscount" @change="discountChange"></el-input>
  </div>
</template>
<script>
/**
 * 控制多字段的自定义组件
 */
export default {
  data() {
    return {
      curPay: null,
      curDiscount: null
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    model: {
      immediate: true,
      deep: true, // 需要深度监听，否则form.resetFields后不会触发handler
      handler(val, newVal) {
        this.curPay = val.pay
        this.curDiscount = val.discount
      }
    }
  },
  methods: {
    payChange(val) {
      this.model.pay = val
    },
    discountChange(val) {
      this.model.discount = val
    }
  }
}
</script>
```