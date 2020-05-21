
// 对象克隆
export function DeepCopy(obj) {
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
 * 获取值类型
 * @param val 被检验值类
 * @return type 返回类型
 * @returns 返回值（'null', 'undefined', 'Numer', 'String', 'Boolean', 'Object', 'Array'）
 */
export function getValueType(val) {
  if (val === null) {
    return 'null'
  }
  if (typeof val === 'undefined') {
    return 'undefined'
  }
  let typeStr = Object.prototype.toString.call(val)
  let reg = /\[object\s(\S*)]$/g
  let type = typeStr.replace(reg, (val, $1) => $1)
  return type
}

export function valueTypeTransform(val, toValueType) {
  // 可支持转换的值类型
  let typeArr = [String, Number, Boolean, Array]
  if (typeArr.indexOf(toValueType) === -1) {
    throw new Error('所需转换值的类型未知')
  }
  if (val instanceof toValueType) {
    return val
  }
  if (toValueType === Array) {
    return [val]
  } else {
    return toValueType(val)
  }
}

export function valueTypeTransformAll(params, formRule) {
  let paramsTarget = {}
  let copy = formRule
  if (params) {
    for (let key in params) {
      let ruleItem = copy.find((item) => {
        return item.id.indexOf(key) > -1
      })
      // console.log(ruleItem)
      if (ruleItem && ruleItem['type']) {
        paramsTarget[key] = valueTypeTransform(params[key], ruleItem['type'])
      }
    }
    return paramsTarget
  }
}

/**
 * 判断为空（null、undefined、'' 返回true）
 * 0 返回 false
 */
export function isEmpty(str) {
  if (typeof str === 'undefined') {
    return true
  } else if (str === null) {
    return true
  } else if (str.length === 0) {
    return true
  } else {
    return false
  }
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

export function getPersent(val) {
  if (isNumber(val)) {
    val = (Math.round(val * 10000) / 100).toFixed(2)
  }
  return val
}

export function priceToFen(val) {
  if (isEmpty(val)) {
    return ''
  }
  val = Math.round(val * 10000) / 100
  return val
}

export function priceToYuan(val) {
  if (isEmpty(val)) {
    return ''
  }
  let price = Number(val) / 100
  return Number(price.toFixed(2))
}
// 以元为单位的价格转化为人民币货币值 如 23000.00 => ￥2,3000.00
export function yuanToCurrency(val) {
  if (isEmpty(val)) {
    return 0
  }
  val = Number(val)
  return val.toLocaleString('zh-Hans-CN', {
    style: 'currency',
    currency: 'CNY'
  })
}

export function isNumber(value) {
  let patrn = /^(-)?\d+(\.\d+)?$/
  if (patrn.exec(value) === null || value === '') {
    return false
  } else {
    return true
  }
}

export function parseParam(url, params) {
  let link = []
  for (let key in params) {
    if (!isEmpty(params[key])) {
      link.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    }
  }
  url += link.length > 0 ? `?${link.join('&')}` : ''
  return url
}

// export function setSessionStorage (key, data) {
//   if (getValueType(data) !== String) {
//     data = JSON.stringify(data)
//   }
//   window.sessionStorage.setItem('cms-' + key, data)
// }

// export function getSessionStorage (key) {
//   let data = window.sessionStorage.getItem('cms-' + key)
//   return JSON.parse(data)
// }
/**
 * 对象转key-value数组
 * @params obj 处理对象
 * @params [{val: '', label: ''}]
 * @params keyToInt key转init
 */
export function objToArray(obj, val = 'val', label = 'label', keyToInt = true) {
  let arr = []
  getValueType(obj) === 'Object' && Object.keys(obj).forEach(key => {
    let item = {}
    item[val] = keyToInt ? Number(key) : key
    item[label] = obj[key]
    arr.push(item)
  })
  return arr
}

/**
 * 获取对象key集合
 * @param obj 处理对象
 * @param type 处理输出类型 ，默认String
 * @return Array {a: 1, b: 2} => [1, 2]
 */
export function getKeyList(obj = {}, handleType = String) {
  let arr = []
  Object.keys(obj).forEach(key => {
    arr.push(handleType(key))
  })
  return arr
}

export function DeepCopyByObj(obj = {}, target) {
  var tempObj = {}
  var result
  Object.keys(obj).forEach((key) => {
    tempObj[key] = target[key]
  })
  result = DeepCopy(tempObj)
  tempObj = null
  return result
}


export function sleep(wait) {
  return new Promise(resolve => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, wait)
  })
}

export function obj2query(obj) {
  if (obj && Object.keys(obj).length > 0) {
    let str = '?'
    Object.keys(obj).forEach((key) => {
      let val = obj[key]
      if (typeof val === 'object') {
        val = JSON.stringify(val)
      }
      str = str + key + '=' + val + '&'
    })
    return str.substr(0, str.length - 1)
  } else {
    return ''
  }
}

export function query2object(queryStr) {
  queryStr = queryStr.replace(/^\?/, '')
  let strs = queryStr.split('&')
  let query = {}
  for (var i = 0; i < strs.length; i++) {
    query[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
  }
  return query
}

/**
 * @description: 树形json数据转一维数组
 * @author: you.deng
 * @param {*} nodes json二维数组
 */
export function jsonToArray(nodes) {
  var r = []
  if (Array.isArray(nodes)) {
    for (var i = 0, l = nodes.length; i < l; i++) {
      r.push(nodes[i]) // 取每项数据放入一个新数组
      if (Array.isArray(nodes[i]['children']) && nodes[i]['children'].length > 0) {
        // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
        r = r.concat(jsonToArray(nodes[i]['children']))
        delete nodes[i]['children']
      }
    }
  }
  return r
}
