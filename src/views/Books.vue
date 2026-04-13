<template>
  <div class="page-container">
    <div class="header-row">
      <h1>Collection de Livres</h1>
      <button class="btn-open-modal" @click="isModalOpen = true">+ Ajouter un livre</button>
    </div>

    <div class="books-placeholder">
       <p>La liste de tes livres s'affiche ici...</p>
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
      <div class="modal-card">
        <div class="modal-header">
          <h2>Add New Book</h2>
          <button class="close-x" @click="isModalOpen = false">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="input-group">
              <label>Title</label>
              <input v-model="newBook.title" type="text" placeholder="Titre du livre" required />
            </div>

            <div class="input-group">
              <label>Image URL</label>
              <input v-model="newBook.image" type="text" placeholder="Lien de la couverture" />
            </div>

            <div class="input-group">
              <label>Editor</label>
              <input v-model="newBook.editor" type="text" placeholder="Nom de l'éditeur" />
            </div>

            <div class="input-group">
              <label>Year</label>
              <input v-model="newBook.year" type="number" placeholder="Ex: 2024" />
            </div>

            <div class="input-group full-width">
              <label>Description</label>
              <textarea v-model="newBook.description" rows="3" placeholder="Résumé..."></textarea>
            </div>

            <div class="input-group full-width">
              <label>Author</label>
              <select v-model="newBook.author" required>
                <option value="" disabled>Sélectionner un auteur</option>
                <option v-for="author in authors" :key="author">{{ author }}</option>
              </select>
            </div>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="isModalOpen = false">Annuler</button>
            <button type="submit" class="btn-save">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(false);
const authors = ["Albert Camus", "Harper Lee", "F. Scott Fitzgerald", "Gabriel Garcia Marquez", "Herman Melville", "Leo Tolstoy"];

const newBook = ref({
  title: '',
  image: '',
  editor: '',
  year: null,
  description: '',
  author: ''
});

const handleSubmit = () => {
  console.log("Nouveau livre:", newBook.value);
  alert("Livre ajouté !");
  isModalOpen.value = false; // Ferme la pop-up après ajout
};
</script>

<style scoped>
.page-container { padding: 40px; background-color: #f4f4f4; min-height: 90vh; }
.header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }

.btn-open-modal {
  background: #2a5298; color: white; border: none; padding: 12px 24px;
  border-radius: 8px; cursor: pointer; font-weight: 600;
}

/* STYLE DE LA MODALE */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}

.modal-card {
  background: white; width: 500px; padding: 30px; border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2); animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.close-x { background: none; border: none; font-size: 1.5rem; cursor: pointer; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.full-width { grid-column: span 2; }

.input-group label { display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 5px; color: #555; }
input, textarea, select {
  width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit;
}

.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px; }
.btn-cancel { background: #eee; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.btn-save { background: #2a5298; color: white; border: none; padding: 10px 25px; border-radius: 6px; cursor: pointer; }
</style>