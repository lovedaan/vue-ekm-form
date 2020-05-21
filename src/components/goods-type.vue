<template>
  <div class="goods-type">
    <div
      v-for="(item, index) of arr"
      :key="index"
      :class="['item', index === nowIndex ? 'active' : '']"
      @click="toggle(index)"
    >{{item}}</div>
  </div>
</template>
<script>
export default {
  props: ['index'],
  data() {
    return {
      arr: ["虚拟商品", "实物商品"],
      nowIndex: 0,
    };
  },
  mounted() {
    console.log(this.index);
    
  },
  methods: {
    toggle(index) {
      this.nowIndex = index;
      this.$emit('handleClick', index);
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-type {
  display: flex;
  .item {
    width: 100px;
    height: 100px;
    background: red;
    text-align: center;
    line-height: 100px;
    border-radius: 50%;
    &.active {
      background: yellow;
    }
  }
}
</style>