export default function ({ body }) {
  let { username, password } = JSON.parse(body);
  let totalUserInfo = require("../mockData/userInfoData.json");
  let totalUsers = Object.keys(totalUserInfo);
  if (totalUsers.includes(username)) {
    let [pwd, userInfo] = Object.values(totalUserInfo[username]);
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
