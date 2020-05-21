<script>
import goodsType from '../goods-type.vue'
export default {
  props: {},
  data() {
    return {
      model: {
        username: '',
      },
      formList: [{
        type: 'input',
        key: 'username',
        label: '用户名',
        props: {
          placeholder: '请输入用户名',
          maxlength: 10,
        },
      }, {
        key: 'hobby',
        label: '自定义',
        renderContent(h, item, model) {
          return h(goodsType, {
            props: {
              index: 1
            },
            on: {
              change(val) {
                model.hobby = val;
              }
            }
          });
        }
      }],
    };
  },
  mounted() {
    // 初始化
    this.formList && this.formList.forEach(item => {
      this.model[item.key] = item.defaultVal || '';
    });
  },
  methods: {
    getItem() {
      return <p>999999</p>
    },
    inputChange(e) {
      this.model.name = e;
    },
    renderFormList(h) {
      return this.formList && this.formList.map(item => {
        if(item.type) {
          return h('el-form-item', 
            { props: {label: item.label}}, 
            [
              h('el-input', {
                props: {
                  value: this.model[item.key]
                },
                attrs: {
                  placeholder: item.props && item.props.placeholder,
                  maxlength: item.props && item.props.maxlength
                },
                on: {
                  input: (val) => {
                    this.model[item.key] = val;
                  }
                }
              })
            ])
        } else {
          return h('el-form-item', { props: {label: item.label}}, [item.renderContent(h, item, this.model)])
        }
        
      })
    }
  },
  render(h) {
    /* return (
      <el-form model={this.model} ref="form">
        <el-form-item>
          <el-input value={this.model.name} onInput={(e) => {this.inputChange(e)}}></el-input>
        </el-form-item>
      </el-form>
    ) */
    return h('el-form', {
      props: {
        model: this.model,
        labelWidth: '80px'
      },
      style: {
        overflow: 'hidden'
      },
      ref: 'form',
    }, [
      this.$slots.prepend,
      // h('div', this.renderFormList(h)),
      /* h('el-form-item', {props: {label: '用户名'}}, [
        h('el-input', 
          {
            props: { 
              value: this.model.name
            },
            attrs: {
              placeholder: '输入用户名',
              maxlength: 4
            },
            on: {
              input: (val) => {
                this.model.name = val
              }
            }
          }
        )
      ]), */
      this.renderFormList(h),
      // this.$slots.default,
      this.$slots.append
    ])
  },
}
</script>