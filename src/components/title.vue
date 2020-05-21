
<script>
export default {
  name: 'comp__title',
  /**
   * @param {String} title 标题名称
   */
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  render(h) {
    return (
      h('div', {}, [
        this.$slots.prepend,
        h('span', this.title),
        this.$slots.append,
      ])
    )
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comp__title {
  font-size: 16px;
  background-color: #E5E9F2;
  padding: 14px;
  font-weight: bold;
  margin-bottom: 16px;
}
.comp__title .title {
  display: inline-block;
}
</style>
