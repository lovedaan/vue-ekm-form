import title from '@/components/title'
import { Message } from 'element-ui'

export default function (h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '富文本示例:'
        }
      })
    }
  }, {
    key: 'editor_content',
    title: '素材',
    type: 'editor',
    editable: true,
    props: {
      withFullScreen: true, // 支持全屏编辑
      customConfig: {
        uploadImgServer: '/formbuild/upload',
        uploadImgMaxLength: 1,
        uploadImgHeaders: {
          token: '12345688888888'
        },
        uploadImgHooks: {
          customInsert: function (insertImg, result, editor) {
            if (result.code && result.code == '100') {
              let url = result.data.url
              insertImg(url)
            } else {
              Message.error({
                message: '上传失败',
                type: 'error'
              })
            }
          }
        },
        menus: [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          // 'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          // 'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo' // 重复
        ]
      }
    },
    rule: [{
      required: true,
      type: 'string',
      // validator: (rule, value, callback) => {
      //   if (!value || value.trim() === '<p><br></p>') {
      //     return callback(new Error('正文内容不能为空'))
      //   }
      //   callback()
      // },
      message: '请填写内容'
      // trigger: 'blur,change'
    }]
  }]
}
