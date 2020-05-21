import title from '@/components/title'
export default function (h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '输入框示例:'
        }
      })
    }
  }, {
    key: 'input_title',
    title: '公告标题',
    type: 'input',
    editable: true,
    props: {
      maxlength: 40
    },
    slots: (h) => {
      return [(<template slot="prepend">Http://</template>), (<el-button slot="append" icon="search"></el-button>)]
    },
    rule: [{
      type: 'string',
      required: true,
      message: '请填写公告标题',
      trigger: 'blur'
    }]
  }, {
    key: 'input_content',
    title: '公告内容',
    type: 'input',
    editable: true,
    props: {
      type: 'textarea',
      maxlength: 100,
      autosize: { minRows: 3, maxRows: 6 }
    },
    prepend(h, item, model) {
      return h('span', {}, ['通知：'])
    },
    append: (h, item, model) => {
      let length = model && model.content && model.content.length || 0
      return <span> 注意：可输入{length}/100字</span>
    },
    rule: [{
      type: 'string',
      required: true,
      message: '请填写公告内容',
      trigger: 'blur'
    }]
  }]
}
