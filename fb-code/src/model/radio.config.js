import title from '@/components/title'
export default function(h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '单选组示例:'
        }
      })
    }
  }, {
    key: 'radio_boolean',
    title: '开关',
    type: 'radio',
    text: '开启',
    props: {
      label: 1
    }
  }, {
    key: 'radio_group_type',
    title: '学校类型',
    type: 'radio-group',
    editable: true,
    options: [{
      val: 1,
      label: '公立',
      disabled: true
    }, {
      val: 2,
      label: '私立'
    }],
    rule: [{
      type: 'number',
      required: true,
      message: '请选择展示位置',
      trigger: 'change'
    }]
  }, {
    key: 'radio_group_city',
    title: '城市',
    type: 'radio-button-group',
    editable: true,
    props: {
      disabled: true
    },
    options: [{
      val: 1,
      label: '北京'
    }, {
      val: 2,
      label: '上海'
    }, {
      val: 3,
      label: '深圳'
    }]
  }]
}
