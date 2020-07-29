import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login';
import signup from '@/components/signup';
import landing from "@/components/landing";

Vue.use(VueRouter)

  const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/signup",
    name: "signup",
    component: signup
  },
  {
    path: "/landing",
    name: "landing",
    component: landing
  }
]

const router = new VueRouter({
  routes
})

export default router
