import Mock from 'mockjs';
import login from './mockAPI/login';
import getMenu from './mockAPI/getMenu.js';
import homeAPI from './mockAPI/getHomeData.js';
import userAPI from "./mockAPI/user.js"

// 获取菜单栏信息
Mock.mock('/api/login', 'post', login);
// 获取菜单栏信息
Mock.mock('/api/menu', 'post', getMenu);
// 获取首页卡片数据
Mock.mock('/api/home/count', 'post', homeAPI.getCountData);
// 获取首页echarts图表数据
Mock.mock('/api/home/option', 'post', homeAPI.getOptionData);

// 添加用户信息
Mock.mock('/api/user/add', 'post', userAPI.createUser);

// 编辑用户信息
Mock.mock('/api/user/update', 'post', userAPI.updateUser);

// 删除用户信息
Mock.mock('/api/user/delete', 'post', userAPI.deleteUser);

// 获取用户列表
Mock.mock(/api\/user\/getUser/, userAPI.getUserList);
