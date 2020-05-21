export function DeepCopy (obj) {
  let str
  let newobj
  if (typeof obj !== 'object') {
    return obj
  } else if (window.JSON) {
    str = JSON.stringify(obj)
    newobj = JSON.parse(str)
  } else {
    newobj = obj.constructor === Array ? [] : {}
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? DeepCopy(obj[i]) : obj[i]
    }
  }
  return newobj
}
/**
 * @description: 判断是否是String类型
 * @author: xiemin
 * @param {type}
 * @return:
 */
export function isString (val) {
  return Object.prototype.toString.call(val) === '[object String]'
}
/**
 * @description: 判断是否是Number类型
 * @author: xiemin
 * @param {type}
 * @return:
 */
export function isNumber (val) {
  return typeof val === 'number'
}
/**
 * @description: 判断是否是Array类型
 * @author: xiemin
 * @param {type}
 * @return:
 */
export function isArray (val) {
  return val instanceof Array
}

/**
 * @description: 判断是否是Object类型
 * @author: xiemin
 * @param {type}
 * @return:
 */
export function isObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}


/**
 * @description: 判断是否是Function类型
 * @author: xiemin
 * @param {type}
 * @return:
 */
export function isFunction (val) {
  return Object.prototype.toString.call(val) === '[object Function]'
}
