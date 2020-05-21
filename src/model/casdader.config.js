import title from '@/components/title'
export default function (h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '级联选择器示例:'
        }
      })
    }
  }, {
    key: 'cascader_menu',
    title: '菜单',
    type: 'cascader',
    // editable: true,
    props: {
      filterable: true,
      changeOnSelect: true,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }]
    },
    rule: [{
      type: 'array',
      required: true,
      message: '请选择菜单',
      trigger: 'change'
    }]
  }]
}
