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
    path: "/sonolus",
    component: () => import("@/views/Sonolus.vue"),
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
