// import Vue from 'vue'
// const h = Vue.proptotype.
import title from '@/components/title'
export default function(h) {
  return [{
    type: 'static',

    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '图片上传组件'
        },
        on: {
          inputChange(value) {
            console.log('input value change:', value)
          }
        }
      })
    }
  }, {
    key: 'upload_select_multiple_file',
    title: '选择上传（多文件）',
    type: 'upload',
    editable: true,
    slots: {
      tip: (<div class="el-upload__tip" slot="tip">最多选择4张图片</div>)
    },
    props: {
      disabled: false,
      action: '/mall-admin-web/file/uploadImages.do',
      // action: '/formbuild/upload',
      // action: '/formbuild/upload',
      // mimeType: ['png'],
      name: 'file',
      codeKey: 'code',
      codeSuccessValue: '100',
      urlKey: 'url',
      showDelay: 300,
      limit: 4,
      multiple: true,
      // getUrlMethod(data) {
      //   return data.url
      // },
      beforeRemove(file, fileList) {
        return new Promise((resolve, reject) => {
          this.$confirm('确认删除吗', '提示', {
            type: 'warning'
          }).then(() => {
            resolve()
          }).catch(() => {
            reject(new Error('取消删除'))
          })
        })
      },
      onFail(res) {
        console.log('onFail', res)
      }
    },
    rule: [{
      required: true,
      type: 'array',
      message: '请上传图片',
      trigger: 'change'
    }]
  }, {
    key: 'upload_select_one_file_text',
    title: '选择上传（list-type: text）',
    type: 'upload',
    editable: true,
    props: {
      action: '/formbuild/upload',
      name: 'file',
      codeKey: 'resultCode',
      codeSuccessValue: '100',
      urlKey: 'data.url',
      showDelay: 300,
      single: true,
      listType: 'text',
      getUrlMethod(data) {
        return JSON.parse(data).fileData.url
      }
    },
    rule: [{
      type: 'string',
      required: true,
      message: '请上传图片',
      trigger: 'change'
    }]
  }, {
    key: 'upload_select_one_file_picture',
    title: '选择上传（多张，list-type: picture)',
    type: 'upload',
    props: {
      action: '/formbuild/upload',
      name: 'file',
      codeKey: 'resultCode',
      codeSuccessValue: '100',
      urlKey: 'data.url',
      showDelay: 300,
      limit: 4,
      listType: 'picture'
    }
  }, {
    key: 'upload_drag_file',
    title: '拖拽上传',
    type: 'upload',
    slots: {
      tip: (<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>)
    },
    props: {
      action: '/formbuild/upload',
      showFileList: false,
      name: 'file',
      drag: true,
      codeKey: 'resultCode',
      codeSuccessValue: '100',
      urlKey: 'data.url',
      showDelay: 300,
      getUrlMethod(data) {
        return JSON.parse(data).fileData.url
      }
    },
    rule: [{
      type: 'string',
      required: true,
      message: '请上传图片',
      trigger: 'change'
    }]
  }]
}
