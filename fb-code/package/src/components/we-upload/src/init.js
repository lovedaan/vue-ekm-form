
import { _exceedMaxSize, _checkImageType, _exceedMaxNumber } from './helpers'
import { isArray, isNumber, isString, isFunction } from '../../../util'

/**
 * @description: 检查属性配置是否完善
 * @author: xiemin
 * @param {Object} item 组件配置
 */
function _checkProps(item) {
  const props = item.props || {}
  // 默认上传列表为图片卡，前提是非拖拽类型
  if (!props.listType && !props.drag) {
    props.listType = 'picture-card'
  }
  // 文件格式
  if (!props.mimeType) {
    props.mimeType = ['jpeg', 'png', 'gif']
  }
  // 单张图片样式
  props.imageStyle = Object.assign({
    display: 'inline-block',
    height: '100%',
    width: '100%'
  }, props.imageStyle || {})

  // 单张图片遮罩样式
  props.imgMaskStyle = Object.assign({
    display: 'table',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    background: 'rgba(0,0,0,0.5)',
    color: '#fff'
  }, props.imgMaskStyle || {})

  // 拖拽上传的情况下single 为true
  if (props.drag) {
    props.single = true
  }
  // 拖拽上传和单图模式只允许上传1张
  if (props.single) {
    props.limit = 1
    // 禁止一次选择多上图片
    props.multiple = false
  } else {
    props.limit = props.limit || -1
  }

  if (props.single) { // 单文件模式下初始化文件列表
    props.fileList = []
    if (this.model[item.key]) {
      props.fileList.push({
        name: this.model[item.key],
        url: this.model[item.key],
        realUrl: this.model[item.key]
      })
    }
  } else { // 多文件模式初始化文件列表
    props.fileList = []
    if (this.model[item.key] && !isArray(this.model[item.key])) {
      console.error(`[FORM-BUILD error] 多文件模式下的upload 组件初始值必须为数组。key:${item.key}`)
    } else {
      isArray(this.model[item.key]) && this.model[item.key].forEach(url => {
        props.fileList.push({
          name: '',
          url,
          realUrl: url
        })
      })
    }
  }

  item.props = props

  _checkExceedNumber(item, item.props.fileList)
}


/**
 * @desc 检查是否超出个数限制
 * @param {Object} item 
 * @param {Array} fileList
 */
function _checkExceedNumber(item, fileList) {
  const exceedNumber = _exceedMaxNumber(item.props.limit, fileList)
  if (!item.props.drag && exceedNumber) {
    item.props.full = true
  } else { // 拖拽上传不隐藏上传按钮
    item.props.full = false
  }
}


export function _getClasses(item) {
  return item.props.disabled || item.props.full ? 'disable-upload' : ''
}


/**
 * @desc: 当onSuccess 没有配置的情况下，内置的回调函数如何获取接口返回内容
 * @author: xiemin
 * @param {Object} item 组件配置
 */
function _checkHandlerConfig(item) {
  const props = item.props || {}
  // 接口返回成功的成功码的key
  item.props.codeKey = props.codeKey || 'code'
  // 接口返回成功的成功码的值
  item.props.codeSuccessValue = props.codeSuccessValue || '100'
  // 接口返回成功的url值
  item.props.urlKey = props.urlKey || 'url'
}


/**
 * @desc 将上传后的图片链接添加进对应的字段
 * @param {*} item 文件上传组件配置
 * @param {*} url 上传后的文件链接
 * @param {*} fileList 组件当前文件列表
 */
function _addImageData(item, url, fileList) {
  item.props.fileList = fileList
  if (item.props.single) {
    this.model[item.key] = url
  } else {
    this.model[item.key].push(url)
  }
  this.validateItem(item)
}


/**
 * @desc 删除图片
 * @param {Object} item 
 * @param {Object} file 
 * @param {Array} fileList 
 */
function _delImageData(item, file, fileList) {
  if (file.realUrl) { // 已上传成功
    let delIndex = item.props.fileList.findIndex(fileItem => fileItem.realUrl === file.realUrl)

    delIndex >= 0 && item.props.fileList.splice(delIndex, 1)

    if (item.props.single) {
      if (file.realUrl === this.model[item.key]) {
        this.model[item.key] = ''
      }
    } else {
      let modelDelIndex = this.model[item.key].findIndex(url => file.realUrl === url)
      modelDelIndex >= 0 && this.model[item.key].splice(modelDelIndex, 1)
    }
  } else {
    // 未上传成功
    let delIndex = fileList.findIndex(fileItem => fileItem.url === file.url)
    delIndex >= 0 && fileList.splice(delIndex, 1)
  }
  this.validateItem(item)
}


/**
 * @description: 初始化图片上传成功回调
 * @author: xiemin
 * @param {Object} item 组件配置
 */
function _initSuccessHandler(item) {
  if (!isFunction(item.props.onSuccess)) {
    _checkHandlerConfig.call(this, item)
    item.props.onSuccess = (res, file, fileList) => {
      if (res[item.props.codeKey] == item.props.codeSuccessValue) {
        let url = isFunction(item.props.getUrlMethod) ? item.props.getUrlMethod(res.data) : res.data[item.props.urlKey]
        if (url && isString(url)) {
          // 记录真实路径，以供后面删除
          file.realUrl = url
          // 服务器存在存储延迟
          if (isNumber(item.props.showDelay)) {
            setTimeout(() => {
              _addImageData.call(this, item, url, fileList)
            }, item.props.showDelay)
          } else {
            _addImageData.call(this, item, url, fileList)
          }
        } else {
          this.$message.error('获取图片url失败')
          fileList.splice(-1, 1)
        }
      } else {
        // 删除本地已选中的文件
        _delImageData.call(this, item, file, fileList)
        if (isFunction(item.props.onFail)) {
          item.props.onFail(res)
        }
      }
    }
  }
}


/**
 * @description: 文件变化时检查文件数是否超出上限
 * @author: xiemin
 * @param {Object} item 组件配置
 */
function _initChangeHandler(item) {
  if (!item.props.onChange || !(item.props.onChange instanceof Function)) {
    item.props.onChange = (file, fileList) => {
      // 多张图片上传时标记文件数是否超出上限
      let maxNumber = item.props.limit
      if (!item.props.drag && isNumber(maxNumber) && (maxNumber > 0) && isArray(fileList)) {
        item.curTotal = fileList.length
      }
      // 删除/添加图片时检查是否需要 隐藏/显示 添加按钮
      _checkExceedNumber(item, fileList)
    }
  }
}


/**
 * @description: 初始化beforeUpload回调
 * @author: xiemin
 * @param {Object} item 组件配置
 * @return: {Boolean} 是否继续上传
 */ 
function _initBeforeUploadHandler(item) {
  if (!item.props.beforeUpload || !(item.props.beforeUpload instanceof Function)) {
    item.props.beforeUpload = (file) => {
      // 检查文件数目是否超出限制
      if (item.curTotal && item.curTotal > item.props.limit) {
        this.$message.error(`最多只能上传${item.props.limit}个图片!`)
        return false
      }
      // 检查文件是否是图片格式
      const isType = _checkImageType(file, item.props.mimeType)
      if (!isType) {
        this.$message.error(`只能上传${item.props.mimeType.join('，')}格式的图片!`)
        return false
      }
      // 检查文件大小
      const exceedSize = _exceedMaxSize(item.props.maxSize, file)
      if (exceedSize) {
        this.$message.error(`文件大小不能超过${item.props.maxSize}M!`)
        return false
      }
      return true
    }
  }
}


/**
 * @description: 初始化onRemove回调
 * @author: xiemin
 * @param {Object} item 组件配置
 */
function _initRemoveHandler(item) {
  if (!item.props.onRemove || !(item.props.onRemove instanceof Function)) {
    item.props.onRemove = (file, fileList) => {
      _delImageData.call(this, item, file, fileList)
    }
  }
}

/**
 * @description: 初始化初始默认值
 * @description: 单文件初始值为字符串，多文件初始值为数组
 * @author: xiemin
 * @param {Object} item 组件配置
 * @return: [String, Array] 初始值
 */
export function _initDefaultvalue(item) {
  let defaultvalue = ''
  if (item.props.single || item.props.drag) {
    defaultvalue = ''
  } else {
    defaultvalue = []
  }
  return defaultvalue
}


export function _initItem(item) {
  _checkProps.call(this, item)
  _initSuccessHandler.call(this, item)
  _initChangeHandler.call(this, item)
  _initBeforeUploadHandler.call(this, item)
  _initRemoveHandler.call(this, item)
}
