import {
  isArray,
  // isObject,
  isFunction
} from '../util'
/**
 * 事件回调合并器
 * @params {Object} defaultHandlers 源事件对象
 * @params {Object} addons 新增的事件对象
 * @deprecated {Object} context 事件回调函数触发时绑定的this
 */
export default function (defaultHandlers = {}, addons = {}, context = null) {
  let eventNames = Object.keys(addons)

  eventNames.forEach(eventName => {
    let addon = addons[eventName]
    let defaultHandler = defaultHandlers[eventName]

    defaultHandlers[eventName] = function(...params) {
      // let hasContext = isObject(context)
      if (isFunction(defaultHandler)) {
        defaultHandler(...params)
        // hasContext ? defaultHandler.call(context, ...params) : defaultHandler(...params)
      }

      if (isArray(addon)) {
        addon.forEach(handler => {
          handler(...params)
          // hasContext ? handler.call(context, ...params) : handler(...params)
        })
      } else if (isFunction(addon)) {
        addon(...params)
        // hasContext ? addon.call(context, ...params) : addon(...params)
      }
    }
  })
}
