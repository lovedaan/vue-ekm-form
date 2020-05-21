import discountInput from './template'

export default {
  type: 'discount-ceil',
  defaultValue: 0,
  generate (h, item) {
    return {
      tagName: discountInput,
      props: {
        ...(item.props || {})
      }
    }
  }
}
