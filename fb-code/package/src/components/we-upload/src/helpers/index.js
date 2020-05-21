import { isNumber, isArray } from '../../../../util'
/**
 * @description: 文件上传数限制
 * @author: xiemin
 * @param {type}
 * @return: Boolean 是否超出了文件上传个数 true:未超出 false: 超出
 */
export function _exceedMaxNumber (maxNumber, fileList) {
  return isNumber(maxNumber) && (maxNumber > 0) && isArray(fileList) && (fileList.length >= maxNumber)
}
/**
 * @description: 文件上传数限制（单位：MB）
 * @author: xiemin
 * @param {type}
 * @return: Boolean 是否未超出文件尺寸上限
 */
export function _exceedMaxSize (maxSize, file) {
  return isNumber(maxSize) ? file.size / 1024 / 1024 > maxSize : file.size / 1024 / 1024 > Number(maxSize)
}
/**
 * @description: 检查文件类型是否是可接受的图片格式
 * @author: xiemin
 * @param {File} file
 * @param {Array} mimeType 允许的文件类型
 * @return: Boolean 是否满足文件格式
 */
export function _checkImageType (file, mimeType = ['jpeg', 'png', 'gif']) {
  if (file) {
    let typeName = file.type.replace('image/', '')
    return mimeType.includes(typeName)
  }
  return false
}
