
/**
 * @description: 获取表单配置
 * @author: xiemin
 * @param {Function} h createElement
 * @return: Array<Object> 表单配置
 */
export function generateConfig(h) {
  const req = require.context('./', true, /\.config\.js$/)
  let cache = []
  const requireAll = (r) => r.keys().map(r)

  cache = requireAll(req)
  // 获取组件类型和配置的映射关系
  let formConfig = []
  cache.forEach(model => {
    let curConfig = model.default(h)
    formConfig = formConfig.concat(curConfig)
  })

  return formConfig
}
/**
 * @description: 获取表单初始值
 * @author: xiemin
 * @return: Object 表单初始值
 */
export function generateData() {
  const req = require.context('./', true, /\.data\.js$/)
  let cache = []
  const requireAll = (r) => r.keys().map(r)

  cache = requireAll(req)
  let formData = {}
  cache.forEach(model => {
    let curData = model.default
    formData = Object.assign(formData, curData)
  })

  return formData
}
