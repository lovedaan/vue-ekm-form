import title from '@/components/title'
export default function(h) {
  return [{
    type: 'static',

    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '我是自定义静态组件'
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
  }]
}
