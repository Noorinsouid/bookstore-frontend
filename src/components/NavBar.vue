<template>
  <nav class="navbar">
    <div class="brand">Book Shop</div>
    <div class="nav-links">
      <router-link to="/">Accueil</router-link>
      <router-link to="/books">All-Books</router-link>
      <router-link to="/add">Add</router-link>
      <router-link to="/favourites">Favourites</router-link>
      <router-link to="/login">Logout</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #1a3a8f, #2196F3);
  padding: 15px 30px;
  color: white;
}

.brand {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 14px;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>