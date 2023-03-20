// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/official",
    component: () => import("@/views/Official.vue"),
  },
  {
    path: "/potato",
    component: () => import("@/views/Potato.vue"),
  },
  {
    path: "/game",
    component: () => import("@/views/Game.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
