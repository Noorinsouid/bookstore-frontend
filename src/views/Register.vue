<template>
  <div class="page-container">
    <div class="form-content">
      <div class="field">
        <label>Username</label>
        <input type="text" v-model="username" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" v-model="email" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>
      <div class="actions">
        <button class="btn-blue" @click="handleRegister">Register</button>
        <button class="btn-blue" @click="$router.push('/login')">Switch to Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleRegister() {
      console.log("Register:", this.username);
    },
  },
};
</script>

<style scoped>
.page-container {
  background-color: #d3d3d3;
  min-height: 90vh;
  padding: 20px;
}
.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  width: 100%;
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
.btn-blue {
  background: linear-gradient(to bottom, #4a86bd, #2a5a8a);
  color: white;
  border: 1px solid #000;
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  min-width: 200px;
}
</style>
