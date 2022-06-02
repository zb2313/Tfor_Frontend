import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import Router from "vue-router";
Vue.use(Router);

// Vue.use(infiniteScroll)
Vue.prototype.$moment = moment; //赋值使用
moment.locale("zh-cn"); //国际化，中文
Vue.use(Buefy);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // if (
  //   to.path === "/userhome" ||
  //   to.path === "/writePost" ||
  //   to.path.indexOf("/PostDetails") != -1 ||
  //   to.path === "/Comment"
  // ) {
  //   if (!userId) {
  //     return next("/login");
  //   }
  //   next();
  // }
  // next();
  let userId = window.localStorage.getItem("username");
  if (
    to.path === "/login" ||
    to.path === "/" ||
    to.path == "/admin" ||
    to.path == "/Register"
  ) {
    return next();
  } else if (!userId) {
    Vue.prototype.$message("该页面需要登录后访问，请登录：");
    return next("/login");
  }
  next();
});
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authentication = token; //将token放到请求头发送给服务器
      return config;
    } else {
      return config;
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
