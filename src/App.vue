<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">Book Shop</div>
      <div class="nav-links">
        <router-link to="/">ACCUEIL</router-link>
        <router-link to="/books">ALL-BOOKS</router-link>
        <router-link to="/add">ADD</router-link>
        <router-link to="/favorites">FAVORITES</router-link>
        <router-link to="/logout">LOGOUT</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

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
}

/* Style pour le lien actif */
.nav-links a.router-link-active {
  color: white;
  border-bottom: 2px solid white;
  padding-bottom: 5px;
}
</style>