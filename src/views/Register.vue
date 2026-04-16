<template>
  <div class="page-container">
    <div class="form-container">

      <h2 class="title">Create Account</h2>
      <p class="subtitle">Register a new account</p>

      <div class="field">
        <label>Username</label>
        <input type="text" v-model="newUser.username" />
      </div>

      <div class="field">
        <label>Email</label>
        <input type="email" v-model="newUser.email" />
      </div>

      <div class="field">
        <label>Password</label>
        <input type="password" v-model="newUser.password" />
      </div>

      <div class="actions">
        <button class="btn-primary" @click="handleRegister">
          Register
        </button>

        <button class="btn-secondary" @click="$router.push('/login')">
          Back to login
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// naamlou creation de l'objet eli fih les donnes du formulaire
const newUser = ref({ 
  username: '', 
  email: '', 
  password: '' 
});

const handleRegister = async () => {
  try {
    // nabaathou les infos lel backend w nthabtou ken url shih lel backend wala lee
    const response = await axios.post('http://localhost:3001/auth/signup', {
  email: newUser.value.email,
  username: newUser.value.username,
  password: newUser.value.password
});

    alert("Compte créé avec succès !");

    // ken cbon shih nabaathou lel page de login 
    router.push('/login');

  } catch (error) {
    // ken ghalet yetebaath msg lel erreur
    const message =
      error.response?.data?.message || "Erreur lors de l'inscription";

    alert(message);
    console.error(error);
  }
};
</script>
<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4a86bd, #2a5a8a);
}

.form-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  width: 360px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  text-align: center;
  color: #2a5a8a;
  margin-bottom: 5px;
}

.subtitle {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 13px;
  margin-bottom: 5px;
  color: #333;
}

input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  transition: 0.3s;
  background: #f5f7fa;
}

input:focus {
  border-color: #4a86bd;
  box-shadow: 0 0 5px rgba(74, 134, 189, 0.4);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-primary {
  background: linear-gradient(to right, #4a86bd, #2a5a8a);
  color: white;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1px solid #4a86bd;
  color: #4a86bd;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-secondary:hover {
  background: #4a86bd;
  color: white;
}
</style>