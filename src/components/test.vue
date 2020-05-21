<script>
import GoodsType from './goods-type.vue';
export default {
  props: {},
  data() {
    return {
      index: 1,
    }
  },
  render(h) {
    const _this = this;
    return h(GoodsType, {
      props: {
        index: 1
      },
      on: {
        handleClick(val) {
          console.log(_this.index, 'index-------')
          console.log(val, '----')
        }
      }
    });
  },
  methods: {}
}
</script>