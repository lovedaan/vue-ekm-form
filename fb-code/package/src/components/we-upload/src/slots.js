/**
 * @deprecated
 * @description: 获取图片拖拽上传Vdom
 * @author: xiemin
 * @param {type}
 * @return:
 */
function _getDragContent(h, item) {
  let url = this.model[item.key]
  let imgStyle = item.props.imageStyle
  let imgMaskStyle = item.props.imgMaskStyle
  if (url) {
    return (
      <div style='height: 100%;position: relative;cursor: pointer;'>
        <img src={url} style={imgStyle}></img>
        <div onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0" style={imgMaskStyle}>
          <i class="el-icon-upload2" style="color: #fff;font-size:20px;position: absolute;top: 50%;margin-top: -10px;"></i>
        </div>
      </div>
    )
  } else {
    return [(<i class="el-icon-upload"></i>), (<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>)]
  }
}
/**
 * @description: 获取触发选择文件的插槽，以及初始化交互行为
 * @author: xiemin
 * @param {Function} h createElement函数
 * @param {Object} item 组件配置
 * @return: 触发文件选择的vnodes
 */
export function _renderTriggerSlot (h, item) {
  const props = item.props || {}
  // 判断插槽的格式是否正确
  let triggerContents = ''
  if (item.slots && item.slots.trigger) {
    triggerContents = item.slots.trigger
  } else if (props.drag) { // 判断是否是拖拽上传
    triggerContents = _getDragContent.call(this, h, item)
  } else {
    triggerContents = (<i class='el-icon-plus'></i>)
  }
  // let imageContent = _getImageContent.call(this, h, item)
  // let value = item.blobUrl || this.model[item.key]
  // return value ? imageContent : triggerContents
  return triggerContents
}
/**
 * @description: 获取文件描述的插槽，默认不显示文件描述
 * @author: xiemin
 * @param {Function} h createElement函数
 * @param {Object} item 组件配置
 * @return: 触发文件选择的vnodes
 */
export function _renderTipSlot (h, item) {
  // 判断是否有相关插槽
  // 判断插槽的格式是否正确
  if (item.slots && item.slots.tip) {
    return h('div', {
      slot: 'tip',
      style: {
        lineHeight: '0'
      }
    }, [item.slots.tip])
  } else {
    return ''
  }
}
