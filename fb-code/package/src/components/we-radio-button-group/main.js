export default {
  type: 'radio-button-group',
  defaultValue: '',
  generate (h, item) {
    return {
      tagName: 'el-radio-group',
      props: {
        ...(item.props || {})
      },
      children: item.options.map(option => {
        return h('el-radio-button', {
          props: {
            label: option.val,
            ...item.props
          }
        }, option.label)
      })
    }
  }
}
