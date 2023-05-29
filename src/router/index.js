import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/login/Au-Login.vue")
  },
  {
    path: "/",
    name: "layout",
    hidden: true,
    redirect: "/home",
    component: () => import("@/layout/Au-Layout.vue"),
    children: []
  }
];

function registerNavigationGuards(router) {
  // 配置全局前置路由守卫
  router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem("token");
    if (!token && to.name !== "login") {
      next({ name: "login" });
    } else if (token && to.name === "login") {
      next({ name: "layout" });
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

const createRouter = () =>
  registerNavigationGuards(
    new VueRouter({
      mode: "history",
      routes: routes
    })
  );

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
