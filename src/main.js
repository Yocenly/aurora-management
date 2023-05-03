// 引入vue基本配置
import Vue from 'vue';
import App from './App.vue';

// 引入axios以及vue-axios
// import axios from 'axios';
// import VueAxios from 'vue-axios';

// 初始化Mock配置
import '@/../mock/index.js';

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入vue-echarts及相关模块
// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts';
import VueECharts from 'vue-echarts';
// import 'echarts';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/title';

// 引入预定义css样式
import '@/assets/css/index.css';
import '@/assets/css/iconfont.css';
import 'mavon-editor/dist/css/index.css';

// 引入vuex和vue-router配置
import store from '@/store';
import router from '@/router';

Vue.config.productionTip = false;
// Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.component('v-chart', VueECharts);

console.log(process.env.NODE_ENV);

new Vue({
  store,
  router,
  render: (h) => h(App),
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount('#app');
