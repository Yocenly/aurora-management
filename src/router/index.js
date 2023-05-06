import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/Au-Login.vue'),
  },
  {
    path: '/',
    name: 'layout',
    hidden: true,
    redirect: '/home',
    component: () => import('@/components/Au-Layout.vue'),
    children: [
      // {
      //   path: 'home',
      //   name: '首页',
      //   hidden: false,
      //   icon: 's-home',
      //   component: () => import('@/views/home/Au-Home.vue'),
      // },
      // {
      //   path: 'user',
      //   name: '用户管理',
      //   hidden: false,
      //   icon: 'user',
      //   component: () => import('@/views/user/Au-User.vue'),
      // },
      // {
      //   path: 'article',
      //   name: '文章管理',
      //   hidden: false,
      //   icon: 'document',
      //   component: () => import('@/views/article/Au-Article.vue'),
      // },
      // {
      //   path: 'about',
      //   name: '个人中心',
      //   hidden: false,
      //   icon: 'paperclip',
      //   component: () => import('@/views/about/Au-About.vue'),
      // },
    ],
  },
];

function registerNavigationGuards(router) {
  // 配置全局前置路由守卫
  router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token');
    if (!token && to.name !== 'login') {
      next({ name: 'login' });
    } else if (token && to.name === 'login') {
      next({ name: 'layout' });
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
      mode: 'history',
      routes: routes,
    })
  );

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
