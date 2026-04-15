<template>
  <div class="container">
    <h2>Mes Favoris</h2>
    <div v-if="favourites.length === 0" class="empty">
      <p>Aucun livre dans vos favoris.</p>
    </div>
    <div class="books-grid" v-else>
      <div class="book-card" v-for="book in favourites" :key="book.id">
        <img :src="book.cover" :alt="book.title" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.year }}</p>
        <button @click="removeFromFavourites(book.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const favourites = ref([])

onMounted(() => {
  favourites.value = JSON.parse(localStorage.getItem('favourites') || '[]')
})

function removeFromFavourites(id) {
  favourites.value = favourites.value.filter(b => b.id !== id)
  localStorage.setItem('favourites', JSON.stringify(favourites.value))
}
</script>

<style scoped>
.container {
  padding: 30px;
}

h2 {
  margin-bottom: 25px;
  color: #1a3a8f;
  font-size: 24px;
}

.empty {
  text-align: center;
  padding: 50px;
  color: #666;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.book-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.book-card h3 {
  margin: 10px 0 5px;
  color: #1a3a8f;
  font-size: 15px;
}

.book-card p {
  color: #444;
  margin-bottom: 10px;
}

.book-card button {
  border: 1px solid red;
  background: white;
  color: red;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.book-card button:hover {
  background: red;
  color: white;
}
</style>