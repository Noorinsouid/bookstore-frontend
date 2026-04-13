import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import AddBook from "../views/AddBook.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/books", name: "Books", component: Books },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/add", name: "AddBook", component: AddBook },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
