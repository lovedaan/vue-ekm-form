<template>
  <div>
    <el-button type="primary" @click="disabled = !disabled">切换表单禁用状态</el-button>
    <form-build
      class = 'mt20'
      ref = 'form'
      :formList = 'formList'
      :labelWidth = '200'
      :model = 'model'
      :hideBtnGroup="hideFormBtnGroup"
      :disabled="disabled"
      label-position="left"
      @submit="submit">
      <div slot="prepend">我是prepend插槽</div>
      <div>我是default插槽</div>
      <div slot="append">我是append插槽</div>
    </form-build>
    <el-button @click="validate">校验</el-button>
    <el-button type="primary" @click="clearValidate">清除校验</el-button>
    <el-button type="danger" @click="resetFields">重置数据</el-button>
  </div>
</template>

<script>
import { generateConfig, generateData } from '../model'
export default {
  data () {
    return {
      hideFormBtnGroup: true,
      model: {},
      formList: [],
      disabled: false,

      editTrigger: { // 触发编辑开关的个性化配置
        data: {
          style: {
            position: 'absolute',
            top: '0',
            right: '0'
          }
        },
        enableText: '修改',
        disableText: '保存'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    validate() {
      // 传入callback
      this.$refs.form.validate((formData, valid) => {
        console.log('[form-build][formData]:', formData)
        console.log('[form-build][validate]:', valid)
      })
      // 不传入callback
      // this.$refs.form.validate().then((result) => {
      //   if (result) {
      //     let formData = result
      //     console.log('[form-build][validate]:', formData)
      //   } else {
      //     let valid = valid
      //     console.log('[form-build][validate]:', valid)
      //   }
      // })
    },
    init() {
      this.model = generateData()
      this.formList = generateConfig(this.$createElement)
    },
    submit(formData, valid) {
      console.log('formData', formData)
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
  .inline-block {
    display: inline-block;
  }
</style>
