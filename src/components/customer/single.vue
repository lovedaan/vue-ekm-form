<template>
  <div class="single">
    <el-input :disabled="disabled" v-model="curColor" @change="handleChange"></el-input>
    <span :style="{color: curColor}">我填的颜色</span>
  </div>
</template>
<script>
/**
 * 控制单个字段的自定义组件
 */
export default {
  data() {
    return {
      curColor: ''
    }
  },
  props: {
    value: String,
    default: '#000000',
    disabled: Boolean
  },
  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        this.curColor = val
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style>
.single .el-input {
  width: 200px;
}
</style>


