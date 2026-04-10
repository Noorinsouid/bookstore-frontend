<template>
  <div class="container">
    <!-- Filtre par année -->
    <div class="filters">
      <div class="filter-group">
        <label>Start Year</label>
        <input type="number" v-model="startYear" placeholder="Start Year" />
      </div>
      <div class="filter-group">
        <label>End Year</label>
        <input type="number" v-model="endYear" placeholder="End Year" />
      </div>
      <button @click="filterBooks">Search</button>
    </div>

    <!-- Grille de livres -->
    <div class="books-grid">
      <div class="book-card" v-for="book in filteredBooks" :key="book.id">
        <img :src="book.cover" :alt="book.title" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.year }}</p>
        <button @click="addToFavourites(book)">Add To Favourites</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const startYear = ref('')
const endYear = ref('')

const books = ref([
  { id: 1, title: 'The Outsider', year: 1942, cover: 'https://covers.openlibrary.org/b/id/8739161-L.jpg' },
  { id: 2, title: 'To Kill a Mockingbird', year: 1960, cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg' },
  { id: 3, title: 'The Great Gatsby', year: 1925, cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg' },
  { id: 4, title: '100 Years of Solitude', year: 1967, cover: 'https://covers.openlibrary.org/b/id/8701164-L.jpg' },
  { id: 5, title: 'Moby Dick', year: 1851, cover: 'https://covers.openlibrary.org/b/id/8739166-L.jpg' },
  { id: 6, title: 'War and Peace', year: 1869, cover: 'https://covers.openlibrary.org/b/id/8739165-L.jpg' },
])

const filteredBooks = ref([...books.value])

function filterBooks() {
  filteredBooks.value = books.value.filter(book => {
    const afterStart = startYear.value ? book.year >= startYear.value : true
    const beforeEnd = endYear.value ? book.year <= endYear.value : true
    return afterStart && beforeEnd
  })
}

function addToFavourites(book) {
  const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
  if (!favourites.find(f => f.id === book.id)) {
    favourites.push(book)
    localStorage.setItem('favourites', JSON.stringify(favourites))
    alert(`"${book.title}" ajouté aux favoris !`)
  } else {
    alert(`"${book.title}" est déjà dans vos favoris !`)
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.filters {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  background: white;
  padding: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 13px;
  color: #666;
}

.filter-group input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 150px;
}

.filters button {
  background: #1a3a8f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 18px;
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
  border: 1px solid #1a3a8f;
  background: white;
  color: #1a3a8f;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.book-card button:hover {
  background: #1a3a8f;
  color: white;
}
</style>