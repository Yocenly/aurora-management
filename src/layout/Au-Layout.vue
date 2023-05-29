<template>
  <el-container>
    <el-aside width="auto">
      <SideBar></SideBar>
    </el-aside>
    <el-container class="main-container ">
      <el-header height="84px" style="padding: 0">
        <NavBar :key="$route.fullPath" />
      </el-header>
      <el-main style="background: #f7f9fb">
        <div class="fade-transform-box">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './Au-SideBar.vue'
import NavBar from './Au-NavBar.vue'
export default {
  name: 'Au-Layout',
  components: { SideBar, NavBar },
}
</script>

<style lang='css' scoped>
.main-container {
  height: 100vh;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s ease 0s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-box {
  overflow-x: hidden;
}
</style>
