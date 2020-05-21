export default {
  type: 'checkbox',
  defaultValue: false,
  generate (h, item) {
    return {
      tagName: 'el-checkbox',
      children: item.text,
      props: {
        ...(item.props || {})
      }
    }
  }
}
