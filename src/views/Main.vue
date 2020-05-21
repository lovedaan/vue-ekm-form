<template>
  <div class="container">
    <div class="aside">
      <el-menu
      :default-active="activeMenu"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <i class="el-icon-help"></i>
        <span slot="title">关于</span>
      </el-menu-item>
    </el-menu>
    </div>
    <div class="main-container">
      <div class="header"></div>
      <div class="main">
        <div class="page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'main-view',
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // 可以在路由配置文件中设置自定义的路由路径到meta.activeMenu属性中，来控制菜单自定义高亮显示
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .aside {
    width: 200px;
    height: 100%;
    background-color: #001529;
  }
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
      height: 60px;
      background-color: #f5f7f9;
    }
    .main {
      height: calc(100vh - 60px);
      overflow-y: auto;
      padding: 10px;
      box-sizing: border-box;
      background: #ccc;
    }
    .page {
      width: 100%;
      min-height: 100%;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10px;
      border: 1px #eceef2 solid;
    }
  }
}
</style>