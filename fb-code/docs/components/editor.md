# editor
> 富文本组件（2.4.0+），基于wangEditor组件v3.1.1+开发

## type值
`editor`

## 默认值

空字符串

## props

名称  | 类型 | <div style="width: 200px">默认值</div> | 是否必须 | 说明
:---- | :---- | :---- | :---- | :----
withFullScreen | Boolean | false | 否 | 是否支持全屏编辑
customConfig | Object | {} | 否 | 自定义富文本配置，详细参考[wangEditor官网](https://www.kancloud.cn/wangfupeng/wangeditor3/335776)

## 示例：
```javascript
{
    key: 'editor',
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
              alert('上传失败')
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
    }
  }
```
