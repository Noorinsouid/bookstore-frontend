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
            <select v-model="newBook.author" required>
              <option value="" disabled>Select an author</option>
              <option>Albert Camus</option>
              <option>Harper Lee</option>
              <option>F. Scott Fitzgerald</option>
              <option>Gabriel Garcia Marquez</option>
              <option>Herman Melville</option>
              <option>Leo Tolstoy</option>
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
const newBook = ref({ title: '', image: '', editor: '', year: null, description: '', author: '' });
const handleSubmit = () => { alert("Livre enregistré !"); console.log(newBook.value); };
</script>

<style scoped>
.container { padding: 40px; display: flex; justify-content: center; }

.form-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 700px;
}

.form-title { margin-bottom: 25px; color: #2a5298; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }

.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: span 2; }

label { display: block; font-weight: bold; font-size: 13px; margin-bottom: 8px; color: #555; }

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #f9f9f9;
}

input:focus { border-color: #2a5298; outline: none; background-color: white; }

.btn-save {
  margin-top: 30px;
  background: #2a5298;
  color: white;
  padding: 12px 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  float: right;
  transition: 0.3s;
}

.btn-save:hover { background: #1e3c72; transform: translateY(-2px); }
</style>