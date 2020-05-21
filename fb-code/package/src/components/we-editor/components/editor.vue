<template>
  <div class="we-editor" :class="{'fullscreen-editor': isFullScreen}">
  </div>
</template>
<script>
import WangEditor from 'wangeditor'
import { Message } from 'element-ui'
import emitter from '../../../model/emitter'
let editorInstance = null

export default {
  name: 'we-editor',
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ''
    },
    withFullScreen: { // 是否支持全屏
      type: Boolean,
      default: false
    },
    customConfig: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFullScreen: false // 当前是否是全屏
    }
  },
  watch: {
    value(val, oldVal) {
      editorInstance && editorInstance.txt.html(val)
    },
    disabled(val) {
      editorInstance && editorInstance.$textElem.attr('contenteditable', !val)
    }
  },
  mounted() {
    this.setEditor()
  },
  methods: {
    setEditor() {
      editorInstance = new WangEditor(this.$el)
      
      // 初始化自定义配置
      editorInstance.customConfig = this.getCustomConfig()

      editorInstance.create()
      // 初始化富文本内容
      editorInstance.txt.html(this.value || '')
      // 初始化禁用状态
      editorInstance.$textElem.attr('contenteditable', !this.disabled)
      // 初始化全屏事件
      this.initFullScreen()
    },
    getCustomConfig() {
      let defaultConfig = this.getDefaultConfig()

      let {onchange, onblur} = this.customConfig || {}
      let that = this

      defaultConfig.onchange = function(html) {
        let content = that.dealEmpty(html)

        that.$emit('input', content)
        // hack方法 支持表单自动校验
        that.dispatch('ElFormItem', 'el.form.change', content)

        onchange && onchange.call(that, content)
      }

      defaultConfig.onblur = function(html) {
        // hack方法 支持表单自动校验
        that.dispatch('ElFormItem', 'el.form.blur', html)

        onblur && onblur.call(that, html)
      }

      this.$delete(this.customConfig, 'onchange')
      this.$delete(this.customConfig, 'onblur')

      return Object.assign(defaultConfig, this.customConfig || {})
    },
    getDefaultConfig() {
      return {
        customAlert: function(info) {
          Message.error({
            message: info,
            type: 'error'
          })
        }
      }
    },
    /**
     * 处理空内容
     */
    dealEmpty(html) {
      return html.trim() === '<p><br></p>' ? '' : html
    },
    initFullScreen() {
      if (this.withFullScreen) {
        this.withFullScreen = true

        let toolBarContainer = this.$el.querySelector('.w-e-toolbar')
        if (toolBarContainer) {
          let btnContainer = document.createElement('div')
          btnContainer.className = 'w-e-menu'
          // btnContainer.innerText = '全屏'

          let btnContent = document.createElement('i')
          btnContent.className = '_wangEditor_btn_fullscreen'
          btnContent.innerText = '全屏'
          btnContent.addEventListener('click', this.toggleFullScreen)

          btnContainer.appendChild(btnContent)
          toolBarContainer.appendChild(btnContainer)
        }
      }
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen
      let fullscreenBar = this.$el.querySelector('.w-e-toolbar ._wangEditor_btn_fullscreen')
      if (fullscreenBar) {
        fullscreenBar.innerText = this.isFullScreen ? '退出全屏' : '全屏'
      }
    }
  }
}
</script>
<style>
.we-editor {
  width: 100%;
}
.we-editor .w-e-toolbar {
  flex-wrap: wrap;
  -webkit-box-lines: multiple;
}
.we-editor .w-e-toolbar .w-e-menu:hover{
  z-index: 10002!important;
}

.we-editor .w-e-menu ._wangEditor_btn_fullscreen {
  text-decoration: none;
  font-style: normal;
}

.we-editor.fullscreen-editor {
  position: fixed !important;
  width: 100%!important;
  height: 100%!important;
  left: 0px !important;
  top: 0px !important;
  background-color: white;
  z-index: 9999;
}

.we-editor.fullscreen-editor .w-e-text-container {
  width: 100% !important;
  height: 95% !important;
}
</style>
