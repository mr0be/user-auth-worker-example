
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { errorMessages } from 'vue/compiler-sfc'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function login() {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    username: username.value,
    password: password.value
    })
  })

  if (res.ok) {
    router.push('/')
  } else {
    errorMessage.value = "Benutzername oder Passwort ist falsch."
  }
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" />
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<style scoped>
.login {
  width: 100%;
  max-width: 350px;
  margin: 5rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.4rem;
  font-weight: bold;
}

input {
  padding: 0.6rem;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-weight: bold;
  font-size: 0.9rem;
}
</style>
