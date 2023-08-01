<template>
  <div id="app">
    <el-container>
      <el-aside width="auto">
        <SideBar></SideBar>
      </el-aside>
      <el-container class="main-container ">
        <el-header height="84px" style="padding: 0">
          <TopBar :key="$route.fullPath"/>
        </el-header>
        <el-main style="background: #f7f9fb; overflow-x: hidden">
          <transition name="fade-transform" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopBar from "@/components/layout/children/top-bar";
import SideBar from "@/components/layout/children/side-bar";
import { generateMenu } from "@/assets/js/menu";

export default {
  name: "LayoutComp",
  components: { TopBar, SideBar },
  created() {
    if (sessionStorage.getItem("token")) {
      generateMenu();
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="less">
@import "../style/index.less";
</style>

