import formBuild from './src/main.vue'
import { isFunction } from './src/util'
formBuild.install = (Vue, options) => {
  Vue.component(formBuild.name, formBuild)
}

export default formBuild


/**
 * @desc 注册自定义组件作为内置组件
 * @param {Array} componentOptions 
 */
export const register = function(...componentOptions) {
  if (!componentOptions || !componentOptions.length) {
    console.error('[form-build]::register- 请传入至少一个组件配置')
    return
  }

  let { renderMap = {}, defaultValueMap = {} } = formBuild.data() || { renderMap: {}, defaultValueMap: {} }

  componentOptions.forEach(componentOption => {
    let { type, defaultValue, generate } = componentOption
    if (!type) {
      console.error('[form-build]::register- 请设置type')
      return
    }
    if (!isFunction(generate)) {
      console.error('[form-build]::register- generate必须为Function')
      return
    }
    renderMap[type] = generate
    defaultValueMap[type] = defaultValue
  })

  formBuild.data = function() {
    return {
      renderMap,
      defaultValueMap
    }
  }
}
