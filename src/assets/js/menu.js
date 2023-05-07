import store from "@/store";
import router from "@/router";
import { getMenu } from "@/api";

export function generateMenu() {
  getMenu().then(({ data }) => {
    let userMenus = data.message;
    userMenus.forEach((item) => {
      item.icon = "el-icon-" + item.icon;
      item.hidden = !(store.state.userInfo.admin || store.state.userInfo.permissions.includes(item.name));
      item.component = loadView(item.component);
    });
    store.commit("saveUserMenus", userMenus);
    userMenus.forEach((item) => {
      router.addRoute("layout", item);
    });
  });
}

export const loadView = (view) => {
  return () => import(`@/views${view}`);
};
