<script>
import { resetRouter } from "@/router";

export default {
  name: "TopBar",
  created() {
    let matched = this.$route.matched.filter((item) => item.name !== "root");
    const first = matched[0];
    if (first && first.meta.label !== "首页") {
      matched = [{ path: "/", label: "首页" }].concat(
        matched.map((item) => {
          return {path: item.path, label: item.meta.label}
        })
      );
    } else {
      matched = matched.map((item) => {
        return {path: item.path, label: item.meta.label}
      })
    }

    this.breadcrumbs = matched;
    this.$store.commit("saveTab", this.$route);
    console.log(this.$store.state.tabList)
  },
  data() {
    return {
      isSearch: false,
      fullscreen: false,
      breadcrumbs: []
    };
  },
  methods: {
    goTo(tab) {
      this.$router.push({ path: tab.path }, () => {
      }, () => {
      });
    },
    removeTab(tab) {
      if (tab.path === this.$route.path) {
        let tabList = this.$store.state.tabList;
        let index = tabList.findIndex((item) => item.path === tab.path);
        this.$router.push({ path: tabList[index + 1 === tabList.length ? index - 1 : index + 1].path });
      }
      this.$store.commit("removeTab", tab);
    },
    trigger() {
      this.$store.commit("trigger");
    },
    handleCommand(command) {
      if (command === "about") {
        this.$router.push({ path: "/about" });
      }
      if (command === "logout") {
        sessionStorage.removeItem("token");
        this.$router.push({ path: "/login" });
        this.$store.commit("logout");
        this.$store.commit("resetTab");
        resetRouter();
      }
    },
    closeAllTab() {
      this.$store.commit("resetTab");
      this.$router.push({ path: "/" }, () => {
      }, () => {
      });
    },
    fullScreen() {
      // 实现全屏显示切换功能
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  computed: {
    isActive() {
      return function (tab) {
        if (tab.path === this.$route.path) {
          return "tabs-view-item-active";
        }
        return "tabs-view-item";
      };
    },
    isFold() {
      return this.$store.state.collapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    }
  }
};
</script>

<template>
  <div>
    <!-- 导航栏顶部区域, 实现面包屑和用户菜单等功能 -->
    <div class="top-bar">
      <div class="hambuger-container" @click="trigger">
        <i :class="isFold"/>
      </div>
      <!-- 面包屑模块  -->
      <el-breadcrumb>
        <el-breadcrumb-item v-for="item of breadcrumbs" :key="item.path">
          <span>{{ item.label }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 右侧用户头像菜单栏, 包括全屏显示, 个人中心, 退出登录功能 -->
      <div class="right-menu">
        <!-- 全屏显示图标 -->
        <div class="screen-full" @click="fullScreen">
          <i class="el-icon-full-screen"/>
        </div>
        <!-- 用户头像菜单 -->
        <el-dropdown trigger="click" @command="handleCommand" style="cursor: pointer;">
          <el-avatar :size="40" :src="this.$store.state.userInfo.avatar"/>
          <i class="el-icon-caret-bottom"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="about">
              <i class="el-icon-s-custom"/>个人中心
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <i class="el-icon-switch-button"/>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 导航栏底部区域, 实现可删除的路由标签 -->
    <div class="tabs-view-container">
      <div class="tabs-wrapper">
        <span :class="isActive(item)" v-for="item of this.$store.state.tabList" :key="item.path" @click="goTo(item)">
          {{ item.name }}
          <i class="el-icon-close" v-if="item.path !== '/home'" @click.stop="removeTab(item)"/>
        </span>
      </div>
      <div class="tabs-close-item" style="float: right" @click="closeAllTab">全部关闭</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../style/index.less";
</style>
