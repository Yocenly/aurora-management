import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.js")
  },
  {
    path: "/",
    name: "root",
    component: () => import("@/components/layout/index.js"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.js"),
        meta: {label: "首页"}
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/user/index.js"),
        meta: {label: "用户管理"}
      },
      {
        path: "article",
        name: "article",
        component: () => import("@/views/article/index.js"),
        meta: {label: "文章管理"}
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/index.js"),
        meta: {label: "个人中心"}
      }
    ]
  }
];

function registerNavigationGuards(router) {
  // 配置全局前置路由守卫
  router.beforeEach((to, from, next) => {
    if (to.name === from.name) return;
    const token = sessionStorage.getItem("token");
    if (!token && to.name !== "login") {
      next({ name: "login" });
    } else if (token && to.name === "login") {
      next({ name: "home" });
    } else {
      next();
    }
  });
  // 配置全局后置路由守卫
  // router.afterEach((to, from) => {
  //   console.log(to, from);
  // });
  return router;
}

const createRouter = () => {
  return registerNavigationGuards(
    new VueRouter({
      mode: "hash",
      routes: routes
    })
  );
}

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
