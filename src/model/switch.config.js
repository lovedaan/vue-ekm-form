import title from '@/components/title'
export default function(h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '开关示例:'
        }
      })
    }
  }, {
    key: 'switch_switch1',
    title: '开关',
    type: 'switch',
    editable: true,
    props: {
      onText: '开',
      offText: '关'
    },
    onInput(value, item, model) {
      console.log('switch onInput', value)
    }
  }]
}
