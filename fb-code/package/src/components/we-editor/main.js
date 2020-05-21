import editor from './components/editor'
export default {
  type: 'editor',
  defaultValue: '',
  generate (h, item) {
    return {
      tagName: editor,
      props: {
        ...(item.props || {})
      }
    }
  }
}
