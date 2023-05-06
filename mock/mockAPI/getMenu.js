export default function () {
  return {
    code: 200,
    message: [
      {
        path: '/home',
        name: '首页',
        hidden: false,
        icon: 's-home',
        component: '/home/Au-Home',
      },
      {
        path: '/user',
        name: '用户管理',
        hidden: false,
        icon: 'user',
        component: '/user/Au-User',
      },
      {
        path: '/article',
        name: '文章管理',
        hidden: false,
        icon: 'document',
        component: '/article/Au-Article',
      },

      {
        path: '/about',
        name: '个人中心',
        hidden: false,
        icon: 'paperclip',
        component: '/about/Au-About',
      },
    ],
  };
}
