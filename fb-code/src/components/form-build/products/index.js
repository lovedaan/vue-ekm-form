import productTable from './template'

export default {
  type: 'product-select',
  defaultValue: 0,
  generate (h, item) {
    return {
      tagName: productTable,
      props: {
        ...(item.props || {})
      }
    }
  }
}
