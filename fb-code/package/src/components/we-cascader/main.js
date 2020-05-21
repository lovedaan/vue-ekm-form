// export const defaultValue = []
// export function factory (h, item) {
//   return {
//     tagName: 'el-cascader',
//     props: {
//       ...(item.props || {})
//     }
//   }
// }

export default {
  type: 'cascader',
  defaultValue: [],
  generate (h, item) {
    return {
      tagName: 'el-cascader',
      props: {
        ...(item.props || {})
      }
    }
  }
}
