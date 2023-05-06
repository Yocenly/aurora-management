import Mock from 'mockjs';
import login from './mockAPI/loginVerify';
import getMenu from './mockAPI/getMenu.js';
import homeAPI from './mockAPI/getHomeData.js';

// 获取菜单栏信息
Mock.mock('/api/login', 'post', login);
// 获取菜单栏信息
Mock.mock('/api/menu', 'post', getMenu);
// 获取首页卡片数据
Mock.mock('/api/home/count', 'post', homeAPI.getCountData);
// 获取首页echarts图表数据
Mock.mock('/api/home/option', 'post', homeAPI.getOptionData);
