import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import AddBook from "../views/AddBook.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  // Routes publiques accecible ay aabed
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },

  // Routes protégées lezem tkoun connecte
  { 
    path: "/books", 
    name: "Books", 
    component: Books,
    meta: { requiresAuth: true } 
  },
  { 
    path: "/add", 
    name: "AddBook", 
    component: AddBook,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // njibou user eli stocké fel localstorage
  const isConnected = localStorage.getItem('user');

// ken page testhak connexion w user mouch msajel
  if (to.matched.some(record => record.meta.requiresAuth) && !isConnected) {
    // nrajouh lel page de Login
    next('/login');
  } else {
    // Sinon, nkhaliw yetaada
    next();
  }
});

export default router;