export default {
  type: 'input-number',
  defaultValue: null,
  generate (h, item) {
    item.width = item.width || 120
    return {
      tagName: 'el-input-number',
      props: {
        ...(item.props || {})
      },
      nativeOn: {}
    }
  }
}
