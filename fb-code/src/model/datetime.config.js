import title from '@/components/title'
export default function (h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '时间选择示例:'
        }
      })
    }
  }, {
    key: 'begin_end_time',
    title: '入住-退房时间',
    type: 'datetime',
    defaultValue: ['2019-07-01', '2019-07-31'],
    editable: true,
    editTrigger: { // 触发编辑开关的个性化配置
      data: {
        class: 'el-button--text',
        style: {
          position: 'absolute',
          top: '0',
          right: '0',
          cursor: 'pointer'
        }
      },
      enableText: '修改',
      disableText: '保存'
    },
    props: {
      type: 'daterange',
      format: 'yyyy-MM-dd',
      rangeSeparator: ' To '
    }
  }, {
    key: 'datetime_week',
    title: '结算周',
    type: 'datetime',
    props: {
      type: 'week',
      format: 'yyyy 第 WW 周'
    }
  }, {
    key: 'date',
    title: '日期',
    type: 'datetime',
    dataType(value) {
      let date = new Date(value)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
    },
    props: {
      type: 'date',
      format: 'yyyy-MM-dd'
    }
  }]
}
