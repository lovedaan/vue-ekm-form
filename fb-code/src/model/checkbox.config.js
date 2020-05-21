import title from '@/components/title'
export default function(h) {
  return [{
    type: 'static',

    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '复选框示例:'
        }
      })
    }
  }, {
    key: 'checbox_group_role',
    title: '角色',
    type: 'checkbox-group',
    options: [{
      val: 1,
      label: '白领'
    }, {
      val: 2,
      label: '教师'
    }, {
      val: 3,
      label: '蓝领'
    }],
    rule: [{
      validator (rule, value, callback) {
        if (!value || !value.length) {
          callback(new Error('角色至少选择一项'))
        } else {
          callback()
        }
      },
      trigger: 'change',
      required: true
    }]
  }, {
    key: 'checkbox_group_type',
    title: '教师角色',
    type: 'checkbox-group',
    editable: true,
    defaultValue: [3],
    class: {
      'inline-block': true
    },
    hide(model) {
      return !model.checbox_group_role || !model.checbox_group_role.includes(2)
    },
    props: {
      style: {
        display: 'inline-block'
      }
    },
    rule: [{
      validator (rule, value, callback) {
        if (!value || !value.length) {
          callback(new Error('至少选择一项'))
        } else {
          callback()
        }
      },
      trigger: 'change',
      required: true
    }],
    options: [{
      val: 1,
      label: '班主任'
    }, {
      val: 2,
      label: '英语老师'
    }, {
      val: 3,
      label: '化学老师'
    }]
  }]
}
