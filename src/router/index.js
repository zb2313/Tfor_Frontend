import Vue from "vue";
import VueRouter from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "forumhome",
    component: () => import("../components/forumHome/ForumHome.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/userhome",
    // meta: { requireAuth: true },
    component: () => import("../components/userhome/MyUserHome")
  },
  {
    path: "/writePost",
    component: () => import("../components/writePost/Publish")
  },
  {
    path: "*", component: NotFoundComponent
  },
  {
    path:"/Register",
    name:"Register",
    component:()=>import("../components/Register")
  },
  {
    path:'/PostDetails',
    name:"PostDetails",
    component:()=>import("../components/postHome/PostDetails")
  },
  {
    path:'/PublishPost',
    name:"PublishPost",
    component:()=>import('../components/writePost/Publish')
  },
  {
    path:'/Comment',
    name:'Comment',
    component:()=>import('../components/writePost/Comment')
  },
  {
    path:'/admin',
    name:'admin',
    component:()=>import('../components/admin/admin')
  }
];

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes
});


export default router;
