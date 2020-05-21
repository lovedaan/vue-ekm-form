<template>
  <div class="we-datetime-group-picker" :class='[dateType === "date" ? "datepicker" : "timepicker"]'>
    <el-form-item :prop="stKey" :rules="startTimeRule">
      <el-date-picker
       v-model="startTime"
       :disabled="disabled"
       :clearable="clearable"
       :type="dateType"
       :format="format"
       :editable="false"
       @change="updateStartTime"
       :picker-options="pickerBeginDateBefore"
       :placeholder="placeholders[0]">
     </el-date-picker>
   </el-form-item>

    <div>至</div>

    <el-form-item :prop="etKey" :rules="endTimeRule">
      <el-date-picker
       v-model="endTime"
       :clearable="clearable"
       :type="dateType"
       :format="format"
       :disabled="disabled"
       :editable="false"
       @change="updateEndTime"
       :picker-options="pickerEndDateBefore"
       :placeholder="placeholders[1]">
     </el-date-picker>
    </el-form-item>

    <div v-if="isShowClear && !disabled">
      <el-tooltip effect="dark" content="点击清空日期" placement="top">
        <el-button type='text' @click="clear">清空</el-button>
      </el-tooltip>
      <el-tooltip v-if="isUserClearMinute" effect="dark" content="点击设置整点" placement="top">
        <el-button type='text' @click="clearMinute">设置整点</el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  props: {
    model: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isShowClear: {
      type: Boolean,
      default: true
    },
    // date/datetime
    dateType: {
      type: String
    },
    ids: {
      type: Array,
      required: true
    },
    placeholders: {
      type: Array,
      default() {
        return ['开始时间', '结束时间']
      }
    },
    // 是否设置开始时间为最小时间
    isSetStartTime: {
      type: Boolean,
      default: false
    },
    // 是否设置结束时间为最大时间
    isSetEndTime: {
      type: Boolean,
      default: false
    },
    // 是否使用设置整点
    isUserClearMinute: {
      type: Boolean,
      default: false
    },
    // 返回时间的格式
    formatStr: {
      type: String,
      default: ''
    },
    // 校验规则
    rule: {
      default: null
    }
  },
  data () {
    return {
      clearable: false,
      startTime: '',
      endTime: '',
      stKey: this.ids[0],
      etKey: this.ids[1],
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          // 小于设定的开始时间不可用
          if (this.isSetStartTime) {
            return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
          }
          // 小于设定的结束时间不可用
          if (this.isSetEndTime) {
            return time.getTime() > new Date().getTime()
          }
          // 大于结束时间不可用
          let endTime = this.endTime
          if (endTime) {
            return time.getTime() > new Date(endTime).getTime()
          }
        }
      },
      pickerEndDateBefore: {
        disabledDate: (time) => {
          // 小于设定的开始时间不可用
          if (this.isSetStartTime) {
            return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
          }
          // 小于设定的结束时间不可用
          if (this.isSetEndTime) {
            return time.getTime() > new Date().getTime()
          }
          // 小于开始时间不可用
          let startTime = this.startTime
          if (startTime) {
            return time.getTime() < new Date(startTime).getTime()
          }
        }
      }
    }
  },
  computed: {
    format () {
      // 时间格式
      let formatStr = 'yyyy-MM-dd HH:mm:ss'
      // 日期格式
      if (this.dateType === 'date') {
        formatStr = 'yyyy-MM-dd'
      }
      return formatStr
    },
    startTimeRule() {
      if (!this.rule) return []
      if (this.rule instanceof Array) {
        return this.rule
      } else if (this.stKey in this.rule) {
        return this.rule[this.stKey]
      }
    }, 
    endTimeRule() {
      if (!this.rule) return []
      if (this.rule instanceof Array) {
        return this.rule
      } else if (this.etKey in this.rule) {
        return this.rule[this.etKey]
      }
    }
  },

  mounted () {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      let sTime = this.model[this.stKey]
      let eTime = this.model[this.etKey]
      this.startTime = sTime ? this.getTime(sTime) : ''
      this.endTime = eTime ? this.getTime(eTime) : ''
    }, 300)
  },

  watch: {
    model: {
      deep: true,
      handler (val) {
        let sTime = this.model[this.stKey]
        let eTime = this.model[this.etKey]

        this.startTime = sTime ? this.getTime(sTime) : ''
        this.endTime = eTime ? this.getTime(eTime) : ''
      }
    }
  },
  methods: {
    /**
     * 清空
     */
    clear () {
      this.startTime = ''
      this.endTime = ''
      this.model[this.stKey] = ''
      this.model[this.etKey] = ''
      this.$emit('clear')
    },

    clearMinute () {
      this.startTime = this.getMillsecond(this.startTime)
      this.endTime = this.getMillsecond(this.endTime)
    },

    /**
     * 获取分 + 秒毫秒数
     */
    getMillsecond (time) {
      if (!time) return
      time = new Date(this.getTime(time))

      let millisecond = dayjs(time).millisecond()
      let second = dayjs(time).second()
      let minute = dayjs(time).minute()

      time = this.getTime(time) - millisecond - second * 1000 - minute * 60 * 1000
      return new Date(time)
    },

    /**
     * 获取时间戳
     */
    getTime (time) {
      return new Date(time).getTime()
    },
    updateStartTime () {
      let startTime = this.startTime
      let endTime = this.endTime
      if (startTime && endTime && this.getTime(startTime) > this.getTime(endTime)) {
        this.$message({
          message: '开始日期不能大于结束日期，请重新填写',
          type: 'warning'
        })
        this.model[this.stKey] = ''
        this.startTime = ''
        return
      }
      this.updateModel(startTime, endTime)
    },
    updateEndTime () {
      let startTime = this.startTime
      let endTime = this.endTime
      if (startTime && endTime && this.getTime(startTime) > this.getTime(endTime)) {
        this.$message({
          message: '结束日期不能小于开始日期，请重新填写',
          type: 'warning'
        })
        this.endTime = ''
        this.model[this.etKey] = ''
        return
      }
      this.updateModel(startTime, endTime)
    },
    // 更新model数据
    updateModel (startTime, endTime) {
      // 日期选择器，处理结束日期
      if (this.dateType === 'date' && endTime) {
        endTime = this.handlerEndTime(endTime)
      }
      if (this.formatStr) {
        startTime && (this.model[this.stKey] = dayjs(this.getTime(startTime)).format(this.formatStr))
        endTime && (this.model[this.etKey] = dayjs(this.getTime(endTime)).format(this.formatStr))
      } else {
        startTime && (this.model[this.stKey] = this.getTime(startTime))
        endTime && (this.model[this.etKey] = this.getTime(endTime))
      }
    },
    /**
     * 处理结束日期
     * 日期转换（2017-01-01 to 2017-01-01 23:59:59）
     **/
    handlerEndTime (time) {
      time = dayjs(time).endOf('day').format('YYYY/MM/DD HH:mm:ss')
      return new Date(time)
    }
  }
}
</script>
<style>
.we-datetime-group-picker .el-form-item,
.we-datetime-group-picker, .we-datetime-group-picker div {
  display: inline-block;
}
.datepicker .el-date-editor.el-input{
  width: 140px;
}
</style>
