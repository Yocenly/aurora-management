export default function ({ body }) {
  let { username, password } = JSON.parse(body);
  let totalUserInfo = require("../mockData/permission.json");
  if (username in totalUserInfo) {
    let {password: pwd, userInfo} = totalUserInfo[username];
    if (password === pwd) {
      return {
        code: 200,
        message: "登录成功",
        data: userInfo
      };
    } else {
      return {
        code: 401,
        message: "密码错误",
        data: null
      };
    }
  } else {
    return {
      code: 400,
      message: "用户名错误",
      data: null
    };
  }
}
