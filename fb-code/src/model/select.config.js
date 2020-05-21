/*
 * @description: 组件之间联动
 * @param:
 */
import title from '@/components/title'
const classes = [{
  label: '一班',
  val: 1,
  leader: '苏小雨',
  teacher: '王大锤',
  disabled: true
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
export default function(h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '下拉选择示例:'
        }
      })
    }
  }, {
    key: 'select_class',
    title: '班级',
    type: 'select',
    editable: true,
    props: {
      disabled: true
    },
    options: classes
  }]
}
