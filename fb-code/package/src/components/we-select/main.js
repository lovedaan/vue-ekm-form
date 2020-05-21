export default {
  type: 'select',
  defaultValue: null,
  generate (h, item) {
    return {
      tagName: 'el-select',
      props: {
        ...(item.props || {})
      },
      children: item.options && item.options.map(option => {
        return h('el-option', {
          props: {
            label: option.label,
            value: option.val,
            disabled: (item.props && item.props.disabled) || option.disabled || false
          }
        }, [
          typeof item.renderOption === 'function'
            ? item.renderOption(h, option, item)
            : item.text
        ])
      }),
      on: item.on
    }
  }
}

