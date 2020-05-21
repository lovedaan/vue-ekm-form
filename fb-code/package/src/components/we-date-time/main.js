/**
 * 配置示例
 *  key: 'openTiming',
    title: '定时开启时间',
    type: 'datetime',
    props: {
      // date为日期
      // datetime为时间
      type: 'date'
    },
    rule: [{
      type: 'date',
      required: true,
      message: '请选择定时开启时间',
      trigger: 'change'
    }]
 */
export default {
  type: 'datetime',
  defaultValue: '',
  generate (h, item) {
    item.width = item.width || 200
    return {
      tagName: 'el-date-picker',
      props: {
        ...(item.props || {})
      }
    }
  }
}

