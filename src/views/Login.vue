<template>
  <div class="login-page">
    <div class="form-container">
      <div class="field">
        <label>Username</label>
        <input type="text" v-model="username" />
      </div>

      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>

      <div class="actions">
        <button class="btn-blue" @click="login">Login</button>
        <button class="btn-blue" @click="goToRegister">Switch to Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Login avec:", this.username);
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #d3d3d3; /* Le gris clair que tu as déjà défini */
  min-height: 90vh;
  padding: 40px;
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.field {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Pour faire les barres très longues de ta capture */
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}
.btn-blue {
  background: linear-gradient(to bottom, #4a86bd, #2a5a8a); /* Dégradé bleu */
  color: white;
  border: 1px solid #000;
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}
</style>
