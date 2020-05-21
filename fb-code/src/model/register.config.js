import title from '@/components/title'
export default function(h) {
  return [{
    type: 'static',
    renderContent (h, item, model) {
      return h(title, {
        props: {
          title: '注册自定义示例:'
        }
      })
    }
  }, {
    key: 'discount',
    title: '积分抵扣上限',
    type: 'discount-ceil'
  }, {
    title: '添加商品',
    type: 'product-select',
    editable: true,
    keys: ['choices', 'products']
  }]
}
