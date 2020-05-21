export default {
  type: 'switch',
  defaultValue: false,
  generate (h, item) {
    item.width = 100
    return {
      tagName: 'el-switch',
      props: {
        ...(item.props || {})
      }
    }
  }
}

