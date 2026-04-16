<template>
  <div id="app">
    <nav v-if="isConnected" class="navbar">
      <div class="nav-brand">Book Shop</div>
      <div class="nav-links">
        <router-link to="/">ACCUEIL</router-link>
        <router-link to="/books">ALL-BOOKS</router-link>
        <router-link to="/add">ADD</router-link>
        <router-link to="/favorites">FAVORITES</router-link>
        <a href="#" @click.prevent="handleLogout">LOGOUT</a>
      </div>
    </nav>
    
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isConnected = ref(false);

// netakdou etha user mawjouf fel stockage du navigateur wala lee
const checkUser = () => {
  isConnected.value = !!localStorage.getItem('user');
};

// Vérifier au démarrage
onMounted(() => {
  checkUser();
});

// nchoufou path mtaa page bech yetbadel navbar 
watch(() => route.path, () => {
  checkUser();
});

// Fonction bech déconnecti
const handleLogout = () => {
  localStorage.removeItem('user'); // fasakh user men session 
  isConnected.value = false; // Cache la navbar
  router.push('/login'); // thezek lel page de connexion
};
</script>

<style>
body { margin: 0; font-family: 'Segoe UI', sans-serif; background-color: #e0e0e0; }

.navbar {
  background: linear-gradient(to bottom, #1e3c72, #2a5298);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.nav-brand { font-size: 22px; font-weight: bold; }

.nav-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-left: 20px;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.3s;
  cursor: pointer;
}

.nav-links a.router-link-active {
  color: white;
  border-bottom: 2px solid white;
  padding-bottom: 5px;
}
</style>