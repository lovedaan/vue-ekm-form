import title from '@/components/title'
export default function (h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '数字输入框示例:'
        }
      })
    }
  }, {
    key: 'input_number_age',
    title: '年龄',
    type: 'input-number',
    editable: true,
    props: {
      min: 1,
      max: 150,
      size: 'large',
      controls: false,
      debounce: 0
    },
    append(h, item) {
      return h('span', null, '岁')
    },
    rule: [{
      type: 'number',
      required: true,
      message: '请填写年龄',
      trigger: 'blur'
    }]
  }]
}
