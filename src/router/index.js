import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllBooksView from '../views/AllBooksView.vue'
import FavouritesView from '../views/FavouritesView.vue'
import AddBookView from '../views/AddBookView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/books', component: AllBooksView },
    { path: '/favourites', component: FavouritesView },
    { path: '/add', component: AddBookView },
  ]
})

export default router