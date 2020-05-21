<template>
  <div class="muptiple">
    <el-form-item prop="pay2" :rules="rule.pay2 || []">
      <span>满</span>
      <el-input type="number" v-model="curPay" :disabled="disabled" @change="payChange"></el-input>
    </el-form-item>
    <el-form-item prop="discount2" :rules="rule.discount2 || []">
      <span>减</span>
      <el-input type="number" v-model="curDiscount" :disabled="disabled" @change="discountChange"></el-input>
    </el-form-item>
  </div>
</template>
<script>
/**
 * 控制多字段的自定义组件
 */
export default {
  data() {
    return {
      curPay: null,
      curDiscount: null
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rule: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    model: {
      immediate: true,
      deep: true,
      handler(val, newVal) {
        this.curPay = val.pay2
        this.curDiscount = val.discount2
      }
    }
  },
  methods: {
    payChange(val) {
      this.model.pay2 = val
    },
    discountChange(val) {
      this.model.discount2 = val
    }
  }
}
</script>
<style>
.muptiple .el-input {
  width: 200px;
}
.muptiple .el-form-item {
  display: inline-block;
}
</style>


