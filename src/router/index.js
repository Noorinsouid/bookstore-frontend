import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import AddBook from "../views/AddBook.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [

  // PUBLIC
{ path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },

  {
    path: "/books",
    name: "Books",
    component: Books,
    meta: { requiresAuth: true }
  },

  // ken admin 
  {
    path: "/add",
    name: "AddBook",
    component: AddBook,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  if (to.meta.requiresAdmin && role !== "admin") {
    return next("/books"); // On le redirige vers la liste autorisée
  }

  if (to.meta.requiresUser && role !== "user") {
    return next("/books");
  }

  next(); // Dans tous les autres cas (comme la Home), on laisse passer
});

export default router;