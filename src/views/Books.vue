<template>
  <div class="page-container">

    <div class="header-row">
      <h1>Collection de Livres</h1>

      <!-- ken admin inajem yodkhol -->
      <button
        v-if="isAdmin"
        class="btn-open-modal"
        @click="isModalOpen = true"
      >
        + Ajouter un livre
      </button>

    </div>

    <div class="books-list">

      <div v-for="book in books" :key="book.id" class="book-card">

        <div class="heart" @click="toggleFavorite(book)">
          {{ book.isFavorite ? '❤️' : '🤍' }}
        </div>

        <h3>{{ book.title }}</h3>

        <p><b>Year:</b> {{ book.year }}</p>
        <p><b>Editor:</b> {{ book.editor }}</p>

        <p v-if="book.author">
          <b>Author:</b> {{ book.author.prenom }} {{ book.author.nom }}
        </p>

      </div>

    </div>

    <!-- MODAL ONLY ADMIN -->
    <div
      v-if="isModalOpen && isAdmin"
      class="modal-overlay"
      @click.self="isModalOpen = false"
    >

      <div class="modal-card">

        <div class="modal-header">
          <h2>Add New Book</h2>
          <button class="close-x" @click="isModalOpen = false">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit">

          <div class="form-grid">

            <div class="input-group">
              <label>Title</label>
              <input v-model="newBook.title" type="text" required />
            </div>

            <div class="input-group">
              <label>Image URL</label>
              <input v-model="newBook.image" type="text" />
            </div>

            <div class="input-group">
              <label>Editor</label>
              <input v-model="newBook.editor" type="text" />
            </div>

            <div class="input-group">
              <label>Year</label>
              <input v-model="newBook.year" type="number" required />
            </div>

            <div class="input-group full-width">
              <label>Description</label>
              <textarea v-model="newBook.description"></textarea>
            </div>

            <div class="input-group full-width">
              <label>Author</label>

              <select v-model="newBook.authorId" required>
                <option value="" disabled>Select author</option>

                <option v-for="(author, index) in authors"
                        :key="index"
                        :value="index + 1">
                  {{ author }}
                </option>

              </select>

            </div>

          </div>

          <div class="modal-actions">

            <button type="button" class="btn-cancel" @click="isModalOpen = false">
              Cancel
            </button>

            <button type="submit" class="btn-save">
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const isModalOpen = ref(false);
const books = ref([]);

// ✅ meilleure gestion reactive du role
const role = ref(localStorage.getItem("role"));

// NORMALISATION DU ROLE
const isAdmin = computed(() => {
  return role.value === "admin" || role.value === "ROLE_ADMIN";
});

const authors = [
  "Albert Camus",
  "Harper Lee",
  "F. Scott Fitzgerald",
  "Gabriel Garcia Marquez",
  "Herman Melville",
  "Leo Tolstoy"
];

const newBook = ref({
  title: '',
  image: '',
  editor: '',
  year: null,
  description: '',
  authorId: null
});

const getBooks = async () => {
  try {
    const res = await axios.get('http://localhost:3001/books/all');

    books.value = res.data.listeBooks.map(b => ({
      ...b,
      isFavorite: false
    }));

  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  getBooks();
});

const toggleFavorite = (book) => {
  book.isFavorite = !book.isFavorite;
};

// ADD BOOK (admin only)
const handleSubmit = async () => {
  try {

    if (!isAdmin.value) {
      alert("Access denied");
      return;
    }

    const token = localStorage.getItem('token');

    await axios.post(
      'http://localhost:3001/books/new',
      newBook.value,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Book added");

    isModalOpen.value = false;

    newBook.value = {
      title: '',
      image: '',
      editor: '',
      year: null,
      description: '',
      authorId: null
    };

    getBooks();

  } catch (err) {
    console.error(err);
  }
};
</script>
<style scoped>
.page-container {
  padding: 40px;
  background: #f6f7fb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  color: #111827;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-row h1 {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.btn-open-modal {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
}

.btn-open-modal:hover {
  transform: translateY(-2px);
  background: #4338ca;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.book-card {
  background: white;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  transition: 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.book-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #111827;
}

.book-card p {
  font-size: 14px;
  margin: 4px 0;
  color: #6b7280;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
}

.modal-card {
  background: white;
  width: 520px;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  animation: pop 0.2s ease;
}

@keyframes pop {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.close-x {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #111827;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.full-width {
  grid-column: span 2;
}

.input-group label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  outline: none;
}

input:focus, textarea:focus, select:focus {
  border-color: #4f46e5;
  background: white;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-cancel {
  background: #f3f4f6;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-save {
  background: #4f46e5;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}

.btn-save:hover {
  background: #4338ca;
}
.heart {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.2s;
}

.heart:hover {
  transform: scale(1.2);
}
</style>