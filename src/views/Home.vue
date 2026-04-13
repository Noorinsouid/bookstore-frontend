<template>
  <div class="home-container">
    <h1>Welcome to our Bookstore</h1>
    <p>Explore our collection and manage your favorite books.</p>
    <button @click="$router.push('/books')">View Collection</button>
  </div>
</template>

<script setup>
// On a supprimé l'import de Hello.vue ici
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #2d3436;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background-color: #0984e3;
}
</style>