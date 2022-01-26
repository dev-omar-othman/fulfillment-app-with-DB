import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import logs from "../views/logs.vue";
import inventory from "../views/inventory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/inventory",
    name: "inventory",
    component: inventory,
  },
  {
    path: "/logs",
    name: "logs",
    component: logs,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
