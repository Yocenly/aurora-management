import Mock from 'mockjs';

export default function ({ body }) {
  let { username, password } = JSON.parse(body);
  let userInfo = require('../mockData/LoginData.json');
  if (userInfo[username] && password === userInfo[username]['password']) {
    return {
      code: 200,
      message: '登录成功',
      data: { ...userInfo[username], token: Mock.Random.guid() },
    };
  } else {
    return {
      code: 400,
      message: '用户名/密码错误',
    };
  }
}
