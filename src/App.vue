<template>
  <div id="app">
    <nav v-if="isConnected" class="navbar">
      <div class="nav-brand">Book Shop</div>
      <div class="nav-links">
        <router-link to="/">ACCUEIL</router-link>
        <router-link to="/books">ALL-BOOKS</router-link>
        
        <router-link v-if="userRole === 'admin'" to="/add">ADD</router-link>
        
        <router-link v-if="userRole === 'user'" to="/favorites">FAVORITES</router-link>
        
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
const userRole = ref('');

const checkUser = () => {
  const userStr = localStorage.getItem('user');
  console.log("Contenu de localStorage 'user':", userStr); // Pour débugger

  if (userStr) {
    try {
      const userData = JSON.parse(userStr);
      isConnected.value = true;
      userRole.value = userData.role;
      console.log("Rôle détecté:", userRole.value);
    } catch (e) {
      console.error("Erreur de lecture du JSON user", e);
      isConnected.value = false;
    }
  } else {
    isConnected.value = false;
    userRole.value = '';
  }
};

onMounted(() => {
  checkUser();
});

watch(() => route.path, () => {
  checkUser();
});

const handleLogout = () => {
  localStorage.clear();
  isConnected.value = false;
  userRole.value = '';
  router.push('/login');
};
</script>

<style>
/* Style de base pour s'assurer que la navbar est visible */
body { margin: 0; font-family: sans-serif; }
.navbar {
  background: #1e3c72;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
}
.nav-links a {
  color: white;
  margin-left: 15px;
  text-decoration: none;
  font-weight: bold;
}
.nav-links a.router-link-active {
  border-bottom: 2px solid white;
}
</style>