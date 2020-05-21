import title from '@/components/title'
import single from '../components/customer/single'
import multiple from '../components/customer/multiple'
import multiple2 from '../components/customer/multiple2'
export default function(h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '自定义组件'
        },
        on: {
          inputChange(value) {
            console.log('input value change:', value)
          }
        }
      }, [
        h('span', {
          slot: 'append'
        }, ['（不参与表单校验，提交，组件联动）'])
      ])
    }
  }, {
    key: 'color',
    title: '自定义颜色',
    editable: true,
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
          value: model.color,
          ...(item.props || {})
        },
        on: {
          input(value) {
            model.color = value
          }
        }
      })
    }
  }, {
    keys: ['pay', 'discount'],
    title: '满减优惠',
    required: true,
    editable: true,
    editTrigger: {
      style: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '0'
      },
      enableText: '修改',
      disableText: '保存'
    },
    renderContent (h, item, model) {
      return h(multiple, {
        props: {
          pay: model.pay,
          discount: model.discount,
          rule: [{
            required: true,
            message: '满减优惠任意项不能为空',
            trigger: 'blur'
          }],
          disabled: item.props.disabled
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
  }, {
    title: '满减优惠2',
    required: true,
    editable: true,
    editTrigger: {
      style: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '0'
      }
    },
    renderContent (h, item, model) {
      return h(multiple2, {
        props: {
          model: model,
          disabled: item.props.disabled,
          rule: {
            pay2: [{
              required: true,
              transform(value) {
                return String(value)
              },
              message: '优惠满额不能为空',
              trigger: 'blur'
            }],
            discount2: [{
              required: true,
              transform(value) {
                return String(value)
              },
              message: '优惠额不能为空',
              trigger: 'blur'
            }, {
              validator (rule, value, callback) {
                if (value >= model.pay2) {
                  callback(new Error('优惠额度不能超过总价'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }]
          }
        }
      })
    }
  }]
}
