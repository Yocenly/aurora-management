<script>
export default {
  name: 'SideBar',
  data () {
    return {
      isCollapse: true
    };
  },
}
</script>

<template>
  <div>
    <el-menu class="side-bar" router menu-trigger="click" :collapse="this.$store.state.collapse"
             :default-active="this.$route.path" background-color="#304156" text-color="#BFCBD9" active-text-color="#409EFF">
      <!-- 遍历用户目录 -->
      <template v-for="route of this.$store.state.userMenus">
        <!-- 对于有子菜单的目录单独处理 -->
        <template v-if="route.children && !route.hidden">
          <el-submenu :key="route.name" :index="route.name">
            <!-- 子菜单标题 -->
            <template slot="title">
              <i :class="route.icon"></i>
              <span slot="title">{{ route.name }}</span>
            </template>
            <!-- 子菜单内容 -->
            <template v-for="(child, index) in route.children">
              <el-menu-item v-if="!child.hidden" :key="index" :index="child.path">
                <i :class="route.icon" />
                <span slot="title">{{ child.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 对于没有子菜单的目录单独处理 -->
        <template v-else>
          <el-menu-item v-if="!route.hidden" :key="route.path" :index="route.path">
            <i :class="route.icon"></i>
            <span slot="title">{{ route.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
@import "../style/index.less";
</style>
