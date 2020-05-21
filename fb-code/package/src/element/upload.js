import { Upload } from 'element-ui'
import Vue from 'vue'

function noop() { }

Vue.component('we-upload', {
  name: 'we-upload',
  extends: Upload,
  props: {
    beforeRemove: Function
  },
  methods: {
    handleRemove(file, raw) {
      let fromUploadList = true
      if (!file) {
        fromUploadList = false
      }
      if (raw) {
        file = this.getFile(raw)
      }
      let doRemove = () => {
        this.abort(file)
        let fileList = this.uploadFiles
        fileList.splice(fileList.indexOf(file), 1)
        this.onRemove(file, fileList)
      }

      // beforeRemove 未定义，或者file不存在（beforeUpload阻止的文件上传传入的file为null）
      if (!this.beforeRemove || !fromUploadList) {
        doRemove()
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles)
        if (before && before.then) {
          before.then(() => {
            doRemove()
          }, noop)
        } else if (before !== false) {
          doRemove()
        }
      }
    },
    /**
     * 处理element-ui版本1.x绑定input事件报错的bug
     */
    getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
          'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
        },
        events: {}
      }
    }
  }
})
