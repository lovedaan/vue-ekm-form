import title from '@/components/title'
export default function (h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '时间组选择示例:'
        }
      })
    }
  }, {
    title: '有效时间',
    type: 'datetime-group',
    required: true,
    keys: ['effectBeginTime', 'effectEndTime'],
    editable: true,
    props: {
      dateType: 'datetime',
      // ids: ['effectBeginTime', 'effectEndTime'], // 2.2+已废弃
      isUserClearMinute: true,
      isSetStartTime: true
    },
    rule: [{
      required: true,
      type: 'number',
      message: '请选择时间',
      trigger: 'change'
    }]
  }]
}
