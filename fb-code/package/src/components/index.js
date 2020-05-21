// import weUpload from './weUpload.js'
// import weInput from './weInput.js'
// import weSelect from './weSelect.js'
// import weCheckbox from './weCheckbox.js'
// import weCheckboxGroup from './weCheckboxGroup.js'
// import weRadio from './weRadio.js'
// import weRadioGroup from './weRadioGroup.js'
// import weRadioButtonGroup from './weRadioButtonGroup.js'
// import weSwitch from './weSwitch.js'
// import weDateTime from './weDateTime.js'
// import weInputNumber from './weInputNumber.js'
// import weCascader from './weCascader.js'

// module.exports = {
//   weUpload,
//   weInput,
//   weSelect,
//   weCheckbox,
//   weCheckboxGroup,
//   weRadio,
//   weRadioGroup,
//   weRadioButtonGroup,
//   weSwitch,
//   weDateTime,
//   weInputNumber,
//   weCascader
// }
const req = require.context('.', true, /main\.js$/)

let cache = []
// 提取组件生成器和配置
const requireAll = (r) => r.keys().map(r)

cache = requireAll(req)
// console.log(cache)
// 获取组件类型和配置的映射关系
const renderMap = {}
const defaultValueMap = {}
cache.forEach(model => {
  let type = model.default.type
  renderMap[type] = model.default.generate
  defaultValueMap[type] = model.default.defaultValue
})
export {
  renderMap,
  defaultValueMap
}
