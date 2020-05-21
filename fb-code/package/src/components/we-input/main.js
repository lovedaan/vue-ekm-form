export default {
  type: 'input',
  defaultValue: '',
  generate (h, item) {
    return {
      tagName: 'el-input',
      props: {
        ...(item.props || {})
      },
      nativeOn: {},
      children: (item.slots instanceof Function) ? item.slots(h, item, this.model) : []
    }
  }
}
