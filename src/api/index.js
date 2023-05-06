import request from './request';

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
