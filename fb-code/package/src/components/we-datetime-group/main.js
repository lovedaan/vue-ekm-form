/**
 * 配置示例
 {
    key: 'finalPaymentBeginTime',
    title: '支付尾款有效时间',
    type: 'datetime',
    props: {
      ids: ['finalPaymentBeginTime', 'finalPaymentEndTime']
    },
    rule: [{
      required: true,
      message: '请选择支付定金有效时间',
      trigger: 'change',
      validator: function (rule, value, callback) {
        let condition = that.model.finalPaymentBeginTime && that.model.finalPaymentEndTime
        if (!condition) {
          callback(new Error(rule.message))
        }
        callback()
      }
    }]
 }
 */
import dateTimePicker from './components/datetime-picker'

export default {
  type: 'datetime-group',
  defaultValue: ['', ''],
  generate (h, item) {
    if (!item.props) { item.props = {} }
    return {
      tagName: dateTimePicker,
      props: {
        ids: item.keys,
        model: this.model,
        rule: item.rule,
        ...(item.props || {})
      }
    }
  }
}

