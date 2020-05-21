<template>
  <div class="comp-discount-ceil">
    <el-input v-model="curValue" :disabled="disabled"></el-input>%
    <el-button type="text" @click="toggleDisable">{{disabled ? '点击修改' : '确认修改'}}</el-button>
  </div>
</template>
<script>
export default {
  name: 'discount-ceil',
  data() {
    return {
      curValue: null,

      disabled: true
    }
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  watch: {
    value(val) {
      this.curValue = val
    }
  },
  methods: {
    toggleDisable() {
      this.disabled = !this.disabled
      this.$emit('input', this.curValue)
    }
  }
}
</script>
<style>
.comp-discount-ceil .el-input {
  width: 200px;
}
</style>
