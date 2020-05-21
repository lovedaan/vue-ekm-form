/*
 * @description: 组件之间联动
 */
import title from '@/components/title'
import comp1 from '@/components/comp1'
const classes = [{
  label: '一班',
  val: 1,
  leader: '苏小雨',
  teacher: '王大锤'
}, {
  label: '二班',
  val: 2,
  leader: '马飞',
  teacher: '鱼灵'
}, {
  label: '三班',
  val: 3,
  leader: '丹尼尔',
  teacher: '哈尔'
}]
const students = [{
  classId: 1,
  val: 1,
  label: '1班陈小1',
  inSchool: false
}, {
  classId: 1,
  val: 2,
  label: '1班陈小2',
  inSchool: true
}, {
  classId: 1,
  val: 3,
  label: '1班陈小3',
  inSchool: true
}, {
  classId: 2,
  val: 4,
  label: '2班陈小1',
  inSchool: true
}, {
  classId: 2,
  val: 5,
  label: '2班陈小2',
  inSchool: true
}, {
  classId: 2,
  val: 6,
  label: '2班陈小3',
  inSchool: true
}, {
  classId: 3,
  val: 7,
  label: '3班陈小1',
  inSchool: true
}, {
  classId: 3,
  val: 8,
  label: '3班陈小2',
  inSchool: true
}, {
  classId: 3,
  val: 9,
  label: '3班陈小3',
  inSchool: true
}]
export default function(h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '组件联动示例（值关联，选项关联，显示隐藏关联，必填项关联）:'
        }
      })
    }
  }, {
    key: 'emit_class',
    title: '班级',
    type: 'select',
    options: classes,
    emitters: [{
      trigger: 'change',
      event: 'classChange',
      transfer(item, value) {
        return [classes.find(classItem => classItem.val === value)]
      }
    }]
  }, {
    key: 'emit_teacher',
    title: '班主任（值和"班级"关联）',
    type: 'input',
    props: {
      disabled: true
    },
    listeners: {
      classChange: function(item, classItem) {
        this.model.emit_teacher = classItem.teacher
      },
      adviceChange: function(item, valueString) {
        console.log('listen adviceChange', valueString)
      }
    },
    rule: [{
      type: 'string',
      required: true,
      message: '班主任不能为空',
      trigger: 'blur'
    }]
  }, {
    key: 'emit_leader',
    title: '班长（选项和"班级"关联）',
    type: 'select',
    options: students,
    emitters: [{
      trigger: 'change',
      event: 'leaderChange',
      transfer(item, value) {
        return [item.options.find(student => student.val === value)]
      }
    }],
    listeners: {
      classChange: function(item, classItem) {
        this.model.emit_leader = ''
        if (!classItem) {
          item.options = students
        } else {
          item.options = students.filter(student => student.classId === classItem.val)
        }
      }
    }
  }, {
    key: 'emit_distance',
    title: '班长距离学校(km)（显示与否和"班长"关联）',
    type: 'input',
    attrs: {
      placeholder: '请填写数字'
    },
    props: {
      type: 'number'
    },
    editable: true,
    hide: true,
    listeners: {
      leaderChange: function(item, studentItem) {
        if (studentItem && !studentItem.inSchool) {
          item.hide = false
        } else {
          item.hide = true
          this.model.emit_distance = ''
        }
      }
    }
  }, {
    key: 'emit_advice',
    title: '建议',
    required: true,
    editable: true,
    emitters: [{
      trigger: 'change',
      event: 'adviceChange'
    }],
    listeners: {
      leaderChange: function(item, studentItem) {
        console.log('emit_advice listen leaderChange', studentItem)
      }
    },
    renderOptions(h, item, model) {
      return {
        tag: comp1,
        data: {
          props: {
            value: model.emit_advice,
            rule: [{
              required: true,
              message: '内容不能为空'
            }],
            ...(item.props || {})
          },
          on: {
            input(val) {
              model.emit_advice = val
            }
          }
        },
        children: ['请输入你对所选班级的看法和建议']
      }
    }
  }]
}
