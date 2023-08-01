import request from '../utils/request';

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

export function getMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data,
  });
}

export function getHomeCountData(data) {
  return request({
    url: '/home/count',
    method: 'post',
    data,
  });
}

export function getHomeOptionData(data) {
  return request({
    url: '/home/option',
    method: 'post',
    data,
  });
}

/*
* 获取用户列表
* */
export const getUser = (params) => {
  return request.get('/user/getUser', params);
};

/*
* 添加用户
* */
export const addUser = (data) => {
  return request.post('/user/add', data);
};

/*
* 更新用户信息
* */
export const updateUser = (data) => {
  return request.post('/user/update', data);
};

/*
* 删除用户信息
* */
export const deleteUser = (data) => {
  return request.post('/user/delete', data);
};
