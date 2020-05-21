export default {
  formList: {
    type: Array,
    default: () => []
  },
  // 隐藏按钮操作区
  hideBtnGroup: {
    type: Boolean,
    default: false
  },
  // 全部表单样式内联
  inline: {
    type: Boolean,
    default: false
  },
  // 全部表单禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 表单组件禁用/启用配置（用于表单全局禁用的情况下和组件配置配合实现全局禁用下组件的启用/禁用）
  editTrigger: {
    type: Object
  },
  // 表单label宽度
  labelWidth: {
    type: [Number, String],
    default: 100
  },
  // 表单label位置
  labelPosition: {
    type: String,
    default: 'right'
  },
  // 表单域标签的后缀
  labelSuffix: {
    type: String,
    default: ''
  },
  // 是否显示校验错误信息
  showMessage: {
    type: Boolean,
    default: true
  },
  // 表单内容宽度
  contentWidth: {
    type: [Number, String]
  },
  // 表单数据模型（从父组件传入，方便父组件使用）
  model: {
    type: Object,
    required: true
  },
  // 提交按钮文案
  submitBtnText: {
    type: String,
    default: '提交'
  },
  // 取消按钮文案
  cancelBtnText: {
    type: String,
    default: '取消'
  },
  // 隐藏取消按钮
  hideCancelBtn: {
    type: Boolean,
    default: false
  },
  // 表单项占据的列数
  span: {
    type: [String, Number]
  },
  // 表单项间间隔
  gutter: {
    type: [String, Number]
  }
}
