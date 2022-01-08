import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment"; //导入文件
import Router from "vue-router";
Vue.use(Router);
// import infiniteScroll from "vue-infinite-scroll"
// import Qs from "qs";

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
  store,
  axios,
  // render: function (h) {
  //   return h(App);
  // }
  render: h => h(App)
}).$mount("#app");

// axios.all([axios.post("http://localhost:9090/getuser", Qs.stringify({
//   username: "sasd",
//   password: 123
// })), axios.post("http://localhost:9090/getuser",
//   Qs.stringify({
//     username: "saaa",
//     password: 1234
//   }))]).then(axios.spread((res1, res2) => {
//     console.log(res1)
//     console.log(res2)
//   }))

// axios({
//   url: "http://localhost:9090/getadmin",
//   params: {
//     username: "aaaa"
//   }

// })

// axios.post("http://localhost:9090/getadmin", Qs.stringify({
//   username: '55551',
//   password: 1245
// }))
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
  }
  else if (!userId) {
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
