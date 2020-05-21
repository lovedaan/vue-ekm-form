
import {
  isArray,
  isString,
  isObject,
  isFunction
} from '../util'
import Vue from 'vue'

function generateItemId() {
  const MIN = 1
  const MAX = 1000
  return Math.floor(Math.random() * (MAX - MIN)) + MIN
}
class EventBus {
  constructor(eventPrefix) {
    this.PREFIX = eventPrefix || 'BUS_'
    this.BUS = new Vue()
  }
  clearEvents() {
    this.BUS.$off()
  }
  // 为event bus添加事件绑定
  addListener(vm, item) {
    if (item.listeners && isObject(item.listeners)) {
      const eventNames = Object.keys(item.listeners)
      eventNames.map(eventName => {
        const cb = item.listeners[eventName]
        if (isFunction(cb)) {
          this.BUS.$on(this.PREFIX + eventName, (...params) => {
            cb.call(vm, item, ...params)
          })
        }
      })
    }
  }
  // 为组添加事件绑定
  addComponentListener(vm, item) {
    const _self = this
    // 判断是否有id，只需要处理无id的组件
    if (item.EVENT_BUS_ID) {
      return
    }
    item.EVENT_BUS_ID = generateItemId()
    //
    if (item.emitters && isArray(item.emitters)) {
      if (!item.on) {
        item.on = {}
      }
      item.emitters.forEach(emitter => {
        if (!emitter.trigger || !emitter.event || !isString(emitter.trigger) || !isString(emitter.event)) {
          return
        }
        const event = this.PREFIX + emitter.event
        const transfer = emitter.transfer
        // 绑定事件和默认配置的相同事件回调合并
        let defaultHandler = item.on[emitter.trigger]
        item.on[emitter.trigger] = function(...params) {
          if (isFunction(defaultHandler)) {
            defaultHandler(...params)
          }
          if (isFunction(transfer)) {
            params = transfer.call(this, item, ...params)
            if (!isArray(params)) {
              console.error('Error in [EVENT_BUS]: transfer 方法必须返回数组作为事件接收器的参数')
            }
          }

          _self.BUS.$emit(event, ...params)
        }
      })
    }
  }
  addCustomComponentListener(vm, item) {
    if (typeof item.renderOptions !== 'function') {
      console.error('Error in [EVENT_BUS addCustomComponentListener]: renderOptions必须为function')
      return
    }

    const _self = this
    const renderOptions = item.renderOptions(vm.$createElement, item, vm.model)
    let on = {
      ...(renderOptions.data.on || {})
    }
    if (item.emitters && isArray(item.emitters)) {
      item.emitters.forEach(emitter => {
        if (!emitter.trigger || !emitter.event || !isString(emitter.trigger) || !isString(emitter.event)) {
          return
        }
        const event = this.PREFIX + emitter.event
        const transfer = emitter.transfer
        // 绑定事件和默认配置的相同事件回调合并
        let defaultHandler = renderOptions.data && renderOptions.data.on && renderOptions.data.on[emitter.trigger]
        on[emitter.trigger] = function(...params) {
          if (isFunction(defaultHandler)) {
            defaultHandler(...params)
          }
          if (isFunction(transfer)) {
            params = transfer.call(this, item, ...params)
            if (!isArray(params)) {
              console.error('Error in [EVENT_BUS]: transfer 方法必须返回数组作为事件接收器的参数')
            }
          }

          _self.BUS.$emit(event, ...params)
        }

        renderOptions.data.on = on
      })
    }
    renderOptions.data.on = on
    return renderOptions
  }
}
export default EventBus
