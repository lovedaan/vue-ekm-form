/**
 * 单张图片配置
    title: '图片',
    type: 'upload',
    key: 'image',
    isShowDelBtn: true,  // 单张生效
    props: {
      action: '/mall-admin-web/file/uploadImages.do',
      showFileList: false,
      name: 'images'
    }

    多张图片配置
    title: '图片',
    type: 'upload-list',
    key: 'image',
    limitCount: 9,
    defaultValue: [],
    props: {
      action: '/mall-admin-web/file/uploadImages.do',
      name: 'images',
      listType: 'picture-card'
    }
 */
export default {
  type: 'upload-file',
  defaultValue: '',
  generate (h, item) {
    const that = this
    const key = item.key

    // 是否上传多张图片
    const isPicList = item.type === 'upload-list'
    const _renderUploadSlots = (h, item) => {
      if (isPicList) {
        // 多张图片
        if (['text', 'picture'].includes(item.props.listType)) {
          return <el-button size='small' type='primary'>点击上传</el-button>
        } else {
          return <i class='el-icon-plus'></i>
        }
      } else {
        // 单张图片
        let value = item.blobUrl || that.model[key]
        return value ? <img src={value} style='height: 100px;' title='点击更换图片' /> : <i class='el-icon-plus'></i>
      }
    }
    const _renderAppendSlots = (h, item) => {
      let value = item.blobUrl || that.model[key]
      const del = e => {
        this.$confirm('确认要删除图片吗？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.blobUrl = ''
          that.model[key] = ''
        })
      }
      return item.isShowDelBtn && value ? <el-button slot="tip" type="text" style="margin-left: 10px;" onClick={e => del()}>删除</el-button> : ''
    }
    const init = () => {
      if (isPicList && (!item.props.fileList || item.props.fileList.length === 0)) {
        item.props.fileList = []
        that.model[key].forEach(url => {
          item.props.fileList.push({
            name: '',
            url
          })
        })
      }
    }

    init()
    // console.log(item)

    let disabled = item.props && item.props.disabled
    return {
      tagName: 'el-upload',
      className: {
        'single-upload': !isPicList,
        'is-disable': disabled && isPicList === true || that.model[item.key] && that.model[item.key].length >= item.limitCount
      },
      props: {
        onSuccess: (res, file, fileList) => {
          if (res.code === 100) {
            if (res.data && res.data.length > 0) {
              if (isPicList) {
                if (!Array.isArray(that.model[key])) {
                  console.error(`上传组件${key}必须为数组`)
                  return
                }
                // 记录真实路径，以供后面删除
                file.realUrl = res.data[0]
                that.model[key].push(res.data[0])
              } else {
                item.blobUrl = file.url
                that.model[key] = res.data[0]
              }
            }
          } else {
            that.$notify({
              type: 'error',
              title: '错误提示',
              message: res.message
            })
          }
        },
        onRemove: (file, fileList) => {
          let fileUrl = file.realUrl ? file.realUrl : file.url
          let arr = that.model[key]
          arr.splice(arr.indexOf(fileUrl), 1)
        },
        beforeUpload: (file, a, b) => {
          const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
          // const isLt2M = file.size / 1024 / 1024 < 2

          if (!isType) {
            that.$message.error('只能支持jpg，png，gif!')
          }
          // if (!isLt2M) {
          //   that.$message.error('图片大小不能超过 2MB!')
          // }
          return isType
        },
        ...(item.props || {})
      },
      children: [_renderUploadSlots(h, item), _renderAppendSlots(h, item)]
    }
  }
}
