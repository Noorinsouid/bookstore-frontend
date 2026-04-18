<template>
  <div class="container">
    <div class="form-card">
      <h2 class="form-title">Add a New Book</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="input-grid">

          <div class="input-group">
            <label>Title</label>
            <input v-model="newBook.title" type="text" placeholder="Enter title" required />
          </div>

          <div class="input-group">
            <label>Image URL</label>
            <input v-model="newBook.image" type="text" placeholder="http://..." />
          </div>

          <div class="input-group">
            <label>Editor</label>
            <input v-model="newBook.editor" type="text" />
          </div>

          <div class="input-group">
            <label>Year</label>
            <input v-model="newBook.year" type="number" />
          </div>

          <div class="input-group full-width">
            <label>Description</label>
            <textarea v-model="newBook.description" rows="4"></textarea>
          </div>

          <div class="input-group full-width">
            <label>Author</label>

            <select v-model="newBook.authorId" required>
              <option value="" disabled>Select an author</option>

              <option :value="1">Albert Camus</option>
              <option :value="2">Harper Lee</option>
              <option :value="3">F. Scott Fitzgerald</option>
              <option :value="4">Gabriel Garcia Marquez</option>
              <option :value="5">Herman Melville</option>
              <option :value="6">Leo Tolstoy</option>

            </select>
          </div>

        </div>
        
        <button type="submit" class="btn-save">Save Book</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Initialisation de l'objet book
const newBook = ref({
  title: '',
  image: '',
  editor: '',
  year: null,
  description: '',
  authorId: null  
});

const handleSubmit = async () => {
  try {
    // nekhthou token 
    const token = localStorage.getItem('token');

    // Sécurité ken user mahouch connecte
    if (!token) {
      alert("Session expirée ou inexistante. Veuillez vous reconnecter.");
      router.push('/login');
      return;
    }

    // appel lel backend
    const response = await axios.post(
      'http://localhost:3001/books/new', 
      newBook.value, 
      {
        headers: {
          Authorization: `Bearer ${token}` // Transmission du jeton JWT
        }
      }
    );

    // kteb tzed
    console.log("Livre enregistré:", response.data);
    alert("Livre ajouté avec succès dans la collection !");
    
    // nemchiw lel liste des livre bech nchoufouh ki tzed
    router.push('/books');

  } catch (error) {
    
    console.error("Erreur backend:", error);
    const message = error.response?.data?.message || "Erreur lors de l'enregistrement";
    
    if (error.response?.status === 403) {
      alert("Erreur : Seul un administrateur peut ajouter des livres.");
    } else {
      alert(message);
    }
  }
};
</script>

<style scoped>
/* ===================== */
/* GLOBAL CONTAINER */
/* ===================== */
.container {
  padding: 40px;
  display: flex;
  justify-content: center;
  background: #f5f7fb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

/* ===================== */
/* FORM CARD */
/* ===================== */
.form-card {
  background: white;
  padding: 32px;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 750px;
  border: 1px solid #eef0f5;
}

/* TITLE */
.form-title {
  margin-bottom: 25px;
  color: #2a5298;
  font-size: 22px;
  font-weight: 700;
  border-bottom: 2px solid #eef0f5;
  padding-bottom: 12px;
}

/* ===================== */
/* GRID FORM */
/* ===================== */
.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.full-width {
  grid-column: span 2;
}

/* LABEL */
label {
  display: block;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
  color: #4b5563;
}

/* INPUTS */
input, textarea, select {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
  box-sizing: border-box;
  transition: 0.2s;
  font-size: 14px;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #2a5298;
  background: white;
  outline: none;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.15);
}

/* ===================== */
/* BUTTON (MODERN BLUE) */
/* ===================== */
.btn-save {
  margin-top: 28px;
  background: linear-gradient(135deg, #2a5298, #1e3c72);
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  float: right;
  transition: all 0.25s ease;
  box-shadow: 0 10px 20px rgba(42, 82, 152, 0.25);
}

.btn-save:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(42, 82, 152, 0.35);
}

/* ===================== */
/* BOOK LIST GRID */
/* ===================== */
.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

/* ===================== */
/* BOOK CARD */
/* ===================== */
.book-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: 0.3s;
  position: relative;
  border: 1px solid #eef0f5;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.12);
}

/* TITLE */
.book-card h3 {
  color: #2a5298;
  margin-bottom: 8px;
}

/* TEXT */
.book-card p {
  margin: 4px 0;
  color: #4b5563;
  font-size: 14px;
}

/* ===================== */
/* HEART FAVORITE */
/* ===================== */
.heart {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
}

.heart:hover {
  transform: scale(1.2);
}


@media (max-width: 768px) {
  .input-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }
}
</style>