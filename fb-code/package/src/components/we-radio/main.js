export default {
  type: 'radio',
  defaultValue: false,
  generate (h, item) {
    return {
      tagName: 'el-radio',
      props: {
        ...(item.props || {})
      },
      children: item.text
    }
  }
}
