<template>
  <div>
    <form-build
      class = 'mt20'
      ref = 'form'
      :formList = 'formList'
      :labelWidth = '120'
      :model = 'model'
      :inline="true"
      :span="8"
      :gutter="20"
      >
    </form-build>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hideFormBtnGroup: true,
      model: {},
      formList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      this.formList = [{
        key: 'channelList',
        title: '上线渠道',
        type: 'checkbox-group',
        width: 600,
        options: [{
          val: 1,
          label: '门店通'
        }, {
          val: 11,
          label: '微信'
        }],
        col: {
          span: 8
        },
        rule: [{
          type: 'array',
          required: true,
          message: '请填写上线渠道',
          trigger: 'change'
        }]
      }, {
        key: 'showLocation',
        title: '展示位置',
        type: 'radio-group',
        options: [{
          val: 1,
          label: '轮播图'
        }, {
          val: 11,
          label: '广告位'
        }],
        rule: [{
          type: 'number',
          required: true,
          message: '请选择展示位置',
          trigger: 'blur'
        }]
      }, {
        key: 'title',
        title: '公告标题',
        type: 'input',
        props: {
          maxlength: 40
        },
        rule: [{
          type: 'string',
          required: true,
          message: '请填写公告标题',
          trigger: 'blur'
        }]
      }, {
        key: 'content',
        title: '公告内容',
        type: 'input',
        props: {
          type: 'textarea',
          maxlength: 100,
          autosize: { minRows: 3, maxRows: 6 }
        },
        col: {
          span: 24
        },
        rule: [{
          type: 'string',
          required: true,
          message: '请填写公告内容',
          trigger: 'blur'
        }]
      }]
    }
  }
}
</script>

