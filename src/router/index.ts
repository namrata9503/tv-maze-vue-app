import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/shows",
    name: "allShows",
    component: () => import("../views/AllShows.vue"),
  },
  {
    path: "/showDetails/:id",
    name: "ShowDetails",
    component: () => import("../views/ShowDetails.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
