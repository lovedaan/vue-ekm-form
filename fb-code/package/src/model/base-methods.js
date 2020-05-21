import {
  DeepCopy,
  isArray,
  isFunction,
  isString
  // isObject
  // isFunction
} from '../util'
import EventBus from '../model/event-bus.js'

// 创建事件总线
const EVENT_BUS = new EventBus()

export default {
  _initRules () {
    // 防止formList变化触发rules规则重新生成，进而导致表单自动校验（element-ui 1.x版本校验规则变化会自动触发校验）
    if (this.rulesInited) return
    // 空表单无需初始化
    if (!this.formList || !this.formList.length) return

    let rules = {}
    this.formList.forEach(item => {
      if (!item.rule) return

      if (item.key) {
        rules[item.key] = item.rule
      }
    })
    this.rules = rules
    
    this.rulesInited = true
  },
  /**
   * @description 检查类型是否存在
   */
  _checkType (item) {
    if (item && item.type && item.type !== 'static') {
      if (!this.renderMap[item.type]) {
        console.error(`form-build:表单类型${item.type}不存在`)
        return false
      }
    }
    return true
  },

  /**
   * 初试化model
   */
  _initModel (item) {
    // 判断该类型是否存在
    if (!this._checkType(item)) {
      return
    }

    let { type } = item
    // let { type, hide } = item

    // 自定义内容组件无需初始化model
    if (type === 'static') {
      return
    }

    // 是否是隐藏组件
    // let hideItem = typeof hide === 'function'
    //   ? hide(this.model)
    //   : hide
    // if (hideItem) return

    // 初始化字段和默认值
    let keys = this._getItemKeys(item)
    let defaultValue = this._getDefaultValue(item)

    keys.forEach((id, index) => {
      if (!id) return // id不合法
      if (this.model.hasOwnProperty(id)) return // 该字段已存在
      this.$set(this.model, id, defaultValue[index])
    })
  },

  /**
   * @description 记录组件的初始启用/禁用状态
   */
  _recordInitDisabled(item) {
    // 防止formList的watcher触发重新初始化
    if (!item.hasOwnProperty('initDisabled')) {
      this.$set(item, 'initDisabled', (item.props && item.props.hasOwnProperty('disabled')) ? item.props.disabled : false)
    }
    
    // 对于可编辑的组件，根据全局disable状态初始化可编辑状态
    if (item.editable && !item.hasOwnProperty('editFlag')) {
      this.$set(item, 'editFlag', !this.disabled)
    }
  },

  /**
   * @description 管理组件的禁用状态
   */
  _setDisableState(item) {
    if (!item.props) this.$set(item, 'props', {})

    let disabled = false

    if (this.disabled && item.editable) {
      disabled = !item.editFlag
    } else {
      disabled = this.disabled || item.initDisabled
    }

    if (!item.props.hasOwnProperty('disabled')) {
      this.$set(item.props, 'disabled', disabled)
    } else {
      item.props.disabled = disabled
    }
  },

  /**
   * @description 获取组件关联的key
   */
  _getItemKeys(item) {
    if (isString(item.key)) {
      return [item.key]
    } else if (isArray(item.keys) || isArray(item.props && item.props.ids)) {
      return item.keys || item.props.ids || [] // ids为兼容datetime-group旧版本
    } else {
      return []
    }
  },

  /**
   * @desc 判断组件是否关联多个字段
   */
  _isMultipleKey (item) {
    if (isArray(item.keys) || isArray(item.props && item.props.ids)) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description 获取组件默认值
   */
  _getDefaultValue(item) {
    if (isString(item.key)) {
      let value = item.defaultValue !== undefined ? item.defaultValue : this.defaultValueMap[item.type]
      if (isFunction(value)) {
        value = value(item)
      }
      value = [DeepCopy(value)]
      return value
    } else if (isArray(item.keys)) {
      return item.defaultValue || this.defaultValueMap[item.type] || new Array(item.keys.length)
    } else {
      return []
    }
  },
  /**
   * 获取表单容器样式
   */
  _getItemsContainerStyle() {
    let padding = this.gutter ? parseInt(this.gutter) / 2 + 'px' : null
    if (padding) {
      return {
        'margin-left': `-${padding}`,
        'margin-right': `-${padding}`
      }
    }
  },

  /**
   * 获取form-item样式
   * @dest inline=true可用
   */
  _getStyle(item, pSpan) {
    let { span = pSpan, offset, pull, push } = item.col || {}
    const toFixed = (value, n = 5) => Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    const getSize = val => val ? toFixed(parseInt(val) / 0.24) + '%' : null
    let width = getSize(span)
    let offsetLeft = getSize(offset)
    let right = getSize(pull)
    let left = getSize(push)

    // 计算左右边距
    let marginLeft = this.gutter ? parseInt(this.gutter) / 2 + 'px' : null
    // let marginRight = marginLeft || null

    // // 如果有左右边距，重新计算宽度
    // if (marginLeft) {
    //   width = `calc(${width} - ${parseInt(this.gutter)})`
    // }

    // if (offsetLeft) {
    //   marginLeft = marginLeft ? `calc(${marginLeft} + ${offsetLeft})` : offsetLeft
    // }

    return {
      display: 'inline-block',
      width,
      'margin-left': offsetLeft,
      'padding-left': marginLeft,
      'padding-right': marginLeft,
      right,
      left
    }
  },

  /**
   * @description 设置组件的 emitter & listener
   */
  _initListener(item) {
    EVENT_BUS.addListener(this, item)
    if (item.type && this.renderMap[item.type]) {
      EVENT_BUS.addComponentListener(this, item)
    } else if (typeof item.renderOptions === 'function') {
      return EVENT_BUS.addCustomComponentListener(this, item)
    }
  },
  
  /**
   * @description 移除所有事件监听器，防止重复监听
   */
  _clearListener() {
    EVENT_BUS.clearEvents()
  },

  /**
   * @description 获取未隐藏的字段
   */
  _getModelVisible() {
    let visbleModel = DeepCopy(this.model)
    this.formList && this.formList.forEach(item => {
      let hideItem = typeof item.hide === 'function'
        ? item.hide(this.model)
        : item.hide
      if (hideItem) {
        let keys = this._getItemKeys(item)
        keys.forEach(key => delete visbleModel[key])
      }
    })
    return visbleModel
  }
}
