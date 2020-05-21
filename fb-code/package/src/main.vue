<!--
  @desc 表单生成器（带表单校验、自定义表单、表单联动），配合detailMixins使用
  @solt prepend default append
-->
<script>
import {
  // DeepCopy,
  isArray,
  isFunction,
  isObject
  // isString,
  // isObject,
  // isFunction
} from './util'
import './element/upload'
import props from './model/props'

import {renderMap, defaultValueMap} from './components/index.js'
import baseMethods from './model/base-methods'
// import mainMixin from './mixin/main-mixin'

export default {
  name: 'form-build',
  // mixins: [mainMixin],
  data () {
    return {
      renderMap: renderMap,
      defaultValueMap: defaultValueMap,

      rules: [],
      rulesInited: false // 校验规则是否已经初始化
    }
  },
  props: props,
  render (h) {
    return h('el-form', {
      props: {
        model: this.model,
        rules: this.rules,
        // rules: this.disabled ? {} : this.rules,
        // inline: this.inline,
        labelWidth: this.labelWidth + 'px',
        labelPosition: this.labelPosition,
        showMessage: this.showMessage
      },
      style: {
        overflow: 'hidden'
      },
      ref: 'form',
      nativeOn: {
        submit (e) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }, [
      this.$slots.prepend,
      h('div', {
        style: this._getItemsContainerStyle()
      }, this.renderFormList(h)),
      this.$slots.default,
      !this.hideBtnGroup && !this.disabled && this.formList.length > 0 && this.renderButtonGroup(h),
      this.$slots.append
    ])
  },

  watch: {
    formList: {
      immediate: true,
      deep: true,
      handler: function (val, oldVal) {
        this._initRules()
        this.formList.forEach(item => {
          this._initModel(item)
          this._recordInitDisabled(item)
          this._setDisableState(item)
        })
      }
    },
    disabled() {
      this.formList.forEach(item => {
        this._setDisableState(item)
      })
    }
  },

  methods: {
    ...baseMethods,
    /**
     * @description 渲染每个表单项
     */
    renderFormList (h) {
      this._clearListener()

      return this.formList && this.formList.map(item => {
        if (item.type === 'static') { // 自定义内容组件
          if (!(item.renderContent && item.renderContent instanceof Function)) {
            console.warn(`static类型的表单项目，renderContent不能为空`)
            return
          }
          return h('div', {
            class: ['el-form-item', this.inline ? 'form-item--inline' : ''],
            style: this.inline ? this._getStyle(item, this.span) : {}
          }, [item.renderContent(h, item, this.model)])
        } else {
          return this.getFormItem(h, item, this.getContentByType(h, item))
        }
      })
    },

    /**
     * @description 按组件类型获取渲染vnode
     */
    getContentByType (h, item) {
      let content

      const renderOptions = this._initListener(item)

      if (item.type && this.renderMap[item.type]) {
        content = this.generateTag(h, item, {
          ...this.renderMap[item.type].call(this, h, item)
        })
      } else if (typeof item.renderContent === 'function') {
        content = item.renderContent(h, item, this.model)
      } else if (typeof item.renderOptions === 'function') {
        content = renderOptions ? h(renderOptions.tag, renderOptions.data, renderOptions.children) : null
      }
      
      return content
    },

    /**
     * @description 获取formItem
     */
    getFormItem (h, item, content) {
      let hideItem = typeof item.hide === 'function'
        ? item.hide(this.model)
        : item.hide

      if (!hideItem) {
        return h('el-form-item', {
          // ref: item.ref || null,
          class: [
            item.class,
            this.inline ? 'form-item--inline' : ''
          ],
          style: this.inline ? this._getStyle(item, this.span) : {}, 
          props: {
            prop: item.key,
            label: item.title
          },
          key: item.key || item.title // 阻止就地复用
        }, [
          this.renderTitle(h, item),
          // 表单项prepend
          typeof item.prepend === 'function' ? item.prepend(h, item, this.model) : '',
          content,
          // 表单项append
          typeof item.append === 'function' ? item.append(h, item, this.model) : '',
          // 表单启用/禁用操作按钮
          this.renderEditBtn(h, item)
        ])
      }
    },

    /**
     * @description 渲染 title
     */
    renderTitle (h, item) {
      return <template slot="label">
        {
          item.required === true
            ? <span style="display:inline-block;color: #ff4949;margin-right: 4px;">*</span>
            : ''
        }
        {
          typeof item.renderTitle === 'function'
            ? <span>{item.renderTitle(h, item)}</span>
            : <span>{item.title}</span>
        }
        {
          this.labelSuffix || ''
        }
      </template>
    },

    /**
     * @description 渲染提交 按钮
     */
    renderButtonGroup (h) {
      return h('el-form-item', [
        h('el-button', {
          props: {
            type: 'primary'
          },
          on: {
            click: this.submit
          }
        }, this.submitBtnText),
        !this.hideCancelBtn ? h('el-button', {
          style: {
            'margin-left': '10px'
          },
          on: {
            click: this.cancel
          }
        }, this.cancelBtnText) : '',
        this.$slots['button-before']
      ])
    },

    /**
     * @description 渲染组件启用/禁用 按钮
     */
    renderEditBtn(h, item) {
      if (this.disabled && item.editable) {
        let commonStyle = {
          padding: '10px',
          cursor: 'pointer'
        }

        let commonClass = {
          'el-icon-edit': item.props.disabled,
          'el-icon-check': !item.props.disabled,
          'el-button--text': true
        }

        let enableText
        let disableText
        
        if (item.editTrigger || this.editTrigger) {
          let editTrigger = item.editTrigger || this.editTrigger

          enableText = editTrigger.enableText || ''
          disableText = editTrigger.disableText || ''

          if (isObject(editTrigger.class)) Object.assign(commonClass, editTrigger.class)
          if (isObject(editTrigger.style)) Object.assign(commonStyle, editTrigger.style)

          // 有文字就不显示图标
          if (enableText) delete commonClass['el-icon-edit']
          if (disableText) delete commonClass['el-icon-check']
        }
        return h('span', {
          class: commonClass,
          style: commonStyle,
          on: {
            click: () => { // 点击 启用/禁用 按钮切换组件编辑状态
              if (!item.editFlag) {
                item.editFlag = true
                // 根据各项配置重新设置禁用状态
                this._setDisableState(item)
              } else {
                this.validateItem(item, (arrStrArr) => {
                  if (!arrStrArr) {
                    item.editFlag = false
                    // 根据各项配置重新设置禁用状态
                    this._setDisableState(item)
                  }
                })
              }
            }
          }
        }, item.props.disabled ? enableText : disableText)
      } else {
        return null
      }
    },

    // 生产 tag
    generateTag (h, item, {tagName, props, children, className, nativeOn, on}) {
      let isMultiple = this._isMultipleKey(item) // 是否关联多个字段
      let keys = this._getItemKeys(item) // 字段名称

      // 获取给组件绑定的值
      let value = null
      if (isMultiple) {
        value = keys.map(key => {
          let val = this.model[key]
          return item.dataInType instanceof Function ? item.dataInType(val) : val
        })
      } else {
        let val = this.model[keys[0]]
        value = item.dataInType instanceof Function ? item.dataInType(val) : val
      }

      // 组件input 事件回调
      let onInput = (value) => {
        if (isMultiple) { // 关联多个字段的情况下逐个赋值
          isArray(value) && value.forEach((val, index) => {
            this.model[keys[index]] = item.dataType instanceof Function ? item.dataType(val) : val
          })
        } else {
          // 类型转换
          value = item.dataType instanceof Function ? item.dataType(value) : value
          this.model[keys[0]] = value
        }
        
        this.emitInput(value, item)
      }

      return h(tagName, {
        props: {
          value: value,
          ...props
        },
        style: {
          width: (Number(String(item.width).replace('px', '')) || Number(String(this.contentWidth).replace('px', ''))) + 'px'
        },
        class: className,
        on: {
          input: onInput,
          ...item.on
        },
        nativeOn: {...nativeOn, ...item.nativeOn}
      }, children)
    },

    // 触发 item onInput 事件
    emitInput (value, item) {
      if (typeof item.onInput === 'function') {
        item.onInput(value, item, this.model)
      }
    },

    /**
     * @description 校验组件的所有字段
     */
    validateItem(item, callback) {
      let keys = this._getItemKeys(item)
      let errStrArr = []

      keys.forEach(key => {
        this.$refs.form.validateField(key, errString => {
          if (errString) {
            errStrArr.push(errString)
          }
        })
      })
      
      if (isFunction(callback)) {
        callback(errStrArr && errStrArr.length ? errStrArr : null)
      } else {
        return new Promise((resolve, reject) => {
          if (errStrArr && errStrArr.length) {
            resolve(errStrArr)
          } else {
            resolve(null)
          }
        })
      }
    },

    /**
     * @description 验证表单
     */
    validate(callback) {
      // 过滤掉隐藏的字段
      let model = this._getModelVisible()

      if (isFunction(callback)) {
        this.$refs.form.validate(valid => {
          callback(model, valid)
        })
      } else {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              resolve(model)
            } else {
              resolve(valid)
            }
          })
        })
      }
    },

    /**
     * @description 重置表单数据
     */
    resetFields() {
      this.$refs.form.resetFields()
    },

    /**
     * @description 清除表单校验
     */
    clearValidate(props = []) {
      if (this.$refs.form.clearValidate) {
        this.$refs.form.clearValidate(props)
      } else {
        const fields = props.length
          ? (typeof props === 'string'
            ? this.$refs.form.fields.filter(field => props === field.prop)
            : this.$refs.form.fields.filter(field => props.indexOf(field.prop) > -1)
          ) : this.$refs.form.fields
        fields.forEach(field => {
          field.validateState = ''
          field.validateMessage = ''
          field.validateDisabled = false
        })
      }
    },

    /**
     * @description 提交事件
     */
    submit () {
      return new Promise((resolve, reject) => {
        this.validate()
          .then(model => {
            if (model) {
              this.$emit('submit', model)
              resolve(model)
            } else {
              let valid = model
              reject(valid)
            }
          })
          .catch(error => {
            console.log('[form build]::: submit validate error', error)
          })
      })
    },

    /**
     * @description 取消事件
     */
    cancel () {
      this.$emit('cancel', this.model)
    }
  }
}
</script>
<style>
  .form-item--inline{
    display: inline-block;
    margin-right: 0px;
    box-sizing: border-box;
  }
  /* 文件个数达到上限时隐藏上传按钮 */
  .disable-upload .el-upload {
    display: none;
  }
</style>
