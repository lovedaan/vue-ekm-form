<template>
  <div>
    <form-build
      ref='form'
      :formList="formList"
      :model='model'
      v-bind="formConfig">
    </form-build>
  </div>
</template>

<script>
import formList from './model'

export default {
  data () {
    return {
      model: {},
      formList: formList, // TODO 请把生成的JSON拷贝到这里或者把JSON粘贴进独立的文件中并引入此
      formConfig: {
        'hideBtnGroup': false,
        'disabled': false,
        'labelWidth': 100,
        'labelPosition': 'right',
        'enterSubmit': false,
        'submitBtnText': '提交',
        'cancelBtnText': '取消',
        'hideCancelBtn': false,
        'inline': false
      }
    }
  },
  methods: {
    // 校验表单
    validate() {
      // 传入callback
      this.$refs.form.validate((formData, valid) => {
        console.log('[form-build][formData]:', formData)
        console.log('[form-build][validate]:', valid)
      })
    },
    // TODO 提交表单
    submit(formData, valid) {
    },
    // 清除校验
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    // 重置表单
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
