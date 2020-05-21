<template>
  <div class="muptiple">
    <el-form-item prop="pay" :rules="rule || []">
      <span>满</span>
      <el-input type="number" v-model="curPay" :disabled="disabled" @change="payChange"></el-input>
    </el-form-item>
    <el-form-item prop="discount" :rules="rule || []">
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
    pay: {
      type: [Number, String],
      default: 100
    },
    discount: {
      type: [Number, String],
      default: 0
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
  watch: {
    pay: {
      immediate: true,
      handler(val, newVal) {
        this.curPay = val
      }
    },
    discount: {
      immediate: true,
      handler(val, newVal) {
        this.curDiscount = val
      }
    }
  },
  methods: {
    payChange(val) {
      this.$emit('payChange', val)
    },
    discountChange(val) {
      this.$emit('discountChange', val)
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


