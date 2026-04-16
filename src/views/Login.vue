<template>
  <div class="login-page">
    <div class="form-container">

      <h2 class="title">Welcome Back</h2>
      <p class="subtitle">Login to your account</p>

      <div class="field">
        <label>Email</label>
        <div class="input-group">
          <input type="email" v-model="credentials.email" />
        </div>
      </div>

      <div class="field">
        <label>Password</label>
        <div class="input-group">
          <input type="password" v-model="credentials.password" />
        </div>
      </div>

      <div class="actions">
        <button class="btn-primary" @click="handleLogin">Login</button>
        <button class="btn-secondary" @click="goToRegister">
          Create account
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; // import de la bibliotheque lel les requetes http 
import { useRouter } from 'vue-router';

const router = useRouter();

// objet bech najmou nsajlou les saisies de user 
const credentials = ref({
  email: '',
  password: ''
});

// fonction lel connexion
const handleLogin = async () => {
  try {
    // nabaathou les donnes lel backend (post)
    const response = await axios.post('http://localhost:3001/auth/signin', {
  identifiant: credentials.value.email,
  password: credentials.value.password
});
    // ken c bon nsajlou les infos mtaa user 
    localStorage.setItem('user', JSON.stringify(response.data));
    
    // On stocke aussi le token pour les futures requêtes vers les livres
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    // On redirige vers la page des livres
    router.push('/books');
  } catch (error) {
    // On affiche le message d'erreur qui vient du backend (ex: "Identifiant inexistant")
    const message = error.response?.data?.message || "Identifiants incorrects";
    alert(message);
    console.error(error);
  }
};

// fonction thezna lel page dinscription
const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-page {
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

.input-group {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  transition: 0.3s;
}

.input-group input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
}

.input-group:focus-within {
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