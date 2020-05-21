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
import { _initItem, _initDefaultvalue, _getClasses } from './src/init'
import { _renderTriggerSlot, _renderTipSlot } from './src/slots'
export default {
  type: 'upload',
  defaultValue: _initDefaultvalue,
  generate(h, item) {
    // 初始化默认配置
    _initItem.call(this, item)
    
    return {
      tagName: 'we-upload', // 由于element-ui的1.x版本不方便升级，且部分功能不满足要求，we-upload对el-upload组件做了扩展
      props: {
        ref: 'elUpload',
        withCredentials: true,
        onSuccess: item.props.onSuccess,
        onRemove: item.props.onRemove,
        beforeUpload: item.props.beforeUpload,
        beforeRemove: item.props.beforeRemove,
        ...(item.props || {})
      },
      className: _getClasses.call(this, item),
      children: [_renderTriggerSlot.call(this, h, item), _renderTipSlot.call(this, h, item)]
    }
  }
}
