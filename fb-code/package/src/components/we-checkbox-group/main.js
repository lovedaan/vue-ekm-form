export default {
  type: 'checkbox-group',
  defaultValue: [],
  generate (h, item) {
    return {
      tagName: 'el-checkbox-group',
      props: {
        ...(item.props || {})
      },
      children: item.options.map(option => {
        return h('el-checkbox', {
          props: {
            label: option.val,
            disabled: (item.props && item.props.disabled) || option.disabled || false
          }
        }, option.label)
      }),
      on: {
        ...item.on
      }
    }
  }
}
