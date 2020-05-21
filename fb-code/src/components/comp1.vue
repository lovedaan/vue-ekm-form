/**
 * @description: 自定义文本域组件
 */
<template>
  <div class="comp__textarea">
    <el-form-item prop="emit_advice" :rules="rule || []">
      <el-input :disabled="disabled" v-model="content" type="textarea" placeholder="请输入你想输入的文字..." @change="handleChange"></el-input>
    </el-form-item>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'comp__textarea',
  /**
   * @param {String} value 标题名称
   */
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rule: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  },
  watch: {
    value(val) {
      this.content = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comp__textarea {
  font-size: 16px;
  background-color: #efefef;
  padding: 14px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
