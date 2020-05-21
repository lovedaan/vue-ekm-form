export default {
  type: 'radio-group',
  defaultValue: '',
  generate (h, item) {
    return {
      tagName: 'el-radio-group',
      props: {
        ...(item.props || {})
      },
      children: item.options.map(option => {
        return h('el-radio', {
          props: {
            label: option.val,
            disabled: (item.props && item.props.disabled) || option.disabled || false
          }
        }, option.label)
      })
    }
  }
}

