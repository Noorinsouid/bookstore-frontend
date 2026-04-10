<template>
  <div>
    <!-- Hero Section -->
    <div class="hero">
      <h1>Découvrez des livres pour tous les goûts</h1>
      <p>Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.</p>
      <button @click="$router.push('/books')">Explorer le catalogue</button>
    </div>

    <!-- Livres populaires -->
    <div class="popular">
      <h2>Livres populaires</h2>
      <div class="books-grid">
        <div class="book-card" v-for="book in popularBooks" :key="book.id">
          <img :src="book.cover" :alt="book.title" />
          <h3>{{ book.title }}</h3>
          <p>{{ book.description }}</p>
          <button @click="$router.push('/books')">Voir plus</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <h3>Besoin d'aide ?</h3>
      <p>Contactez-nous pour toute question ou assistance.</p>
      <button>Contactez-nous</button>
    </div>
  </div>
</template>

<script setup>
const popularBooks = [
  {
    id: 1,
    title: "L'étranger",
    description: "Un résumé captivant pour ce livre incontournable.",
    cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg"
  },
  {
    id: 2,
    title: "Le procès",
    description: "Découvrez pourquoi ce livre est un best-seller.",
    cover: "https://covers.openlibrary.org/b/id/8701164-L.jpg"
  },
  {
    id: 3,
    title: "La formule de dieu",
    description: "Un récit qui restera gravé dans votre mémoire.",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  }
]
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 60px 20px;
  background: white;
}

.hero h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.hero p {
  color: #666;
  margin-bottom: 20px;
}

.hero button {
  background: #1a3a8f;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
}

.popular {
  background: #f5f5f5;
  padding: 40px 20px;
  text-align: center;
}

.popular h2 {
  margin-bottom: 30px;
  font-size: 22px;
}

.books-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.book-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  width: 220px;
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
  font-size: 15px;
}

.book-card p {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.book-card button {
  background: #1a3a8f;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.footer {
  background: #222;
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.footer p {
  margin: 10px 0 20px;
  color: #aaa;
}

.footer button {
  background: #1a3a8f;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
}
</style>