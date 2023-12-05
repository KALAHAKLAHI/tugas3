<template>
  <div>
    <h1>Tempat Login</h1>
    <div class="flex flex-col gap-2">
      <input
        type="text"
        required
        v-model="username"
        class="border"
        placeholder="Username"
      />
      <input
        type="password"
        required
        v-model="password"
        class="border"
        placeholder="Password"
      />
      <button
        @click="handleLogin()"
        class="bg-blue-500 text-white py-1 px-3"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import Swal from 'sweetalert2';

const auth = useAuthStore();
const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/login",
    data: {
      username: username.value,
      password: password.value
    }
  })
  if (response.data.status === "success") {
  Swal.fire({
    title: 'Login Success!',
    text: 'Welcome back!',
    icon: 'success',
    confirmButtonText: 'Cool'
  });
  auth.login(username.value);
  router.push('/');
} else if (response.data.status === "error, username not found") {
  Swal.fire({
    title: 'Error',
    text: 'Wrong username',
    icon: 'warning',
    confirmButtonText: 'Try again'
  });
} else if (response.data.status === "error, wrong password") {
  Swal.fire({
    title: 'Error',
    text: 'Wrong password',
    icon: 'warning',
    confirmButtonText: 'Try again'
  });
} else {
  console.log(response);
}
}
</script>