<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarLogo from "../navbar/NavbarLogo.vue";
import { useUserStore } from "../../stores/user";
import { MessageInterface, ResponseInterface } from "../../types/types";
import qs from "qs";
import apiRequest, { HTTP_METHODS } from "../../utils/apiRequest";
import axios, { AxiosError } from "axios";
import MessageComponent from "./MessageComponent.vue";

const username = ref("");
const password = ref("");

const message = ref<MessageInterface>({
  text: "",
  type: "success",
});

const router = useRouter();

const userStore = useUserStore();

const handleLogin = async () => {
  message.value.text = "";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    accept: "application/json",
  };

  const data = qs.stringify({
    username: username.value,
    password: password.value,
  });

  try {
    const response = await apiRequest(HTTP_METHODS.POST, "/token", data, {
      headers,
    });
    localStorage.setItem("token", response.data.access_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await userStore.fetchUser();
    router.push("/");
  } catch (error) {
    const err = error as AxiosError<ResponseInterface>;

    message.value.type = "error";

    switch (err.response?.status) {
      case 422:
        message.value.text = "Fields cannot be empty";
        break;
      default:
        message.value.text = err.response?.data.detail ?? "Something went wrong";
        break;
    }
  }
};

defineExpose({
  username,
  password,
  message,
  handleLogin,
});
</script>

<template>
  <v-sheet elevation="23" rounded="lg" class="pa-8">
    <v-row justify="center" class="my-4">
      <NavbarLogo />
    </v-row>
    <MessageComponent v-if="message.text" :type="message.type" :text="message.text" />
    <v-form @submit.prevent="handleLogin">
      <v-text-field
        id="usernameInput"
        v-model="username"
        prepend-outer-icon="mdi-account"
        label="username"
        variant="underlined"
        type="username"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        id="passwordInput"
        v-model="password"
        prepend-outer-icon="mdi-lock"
        label="Password"
        variant="underlined"
        type="password"
        required
      ></v-text-field>
      <v-row justify="center" class="mb-4">
        <v-btn id="submitButton" color="red" class="text--white px-8" type="submit">Login</v-btn>
      </v-row>
      <v-row justify="center">
        <router-link to="/register"><v-btn variant="text" class="text--gray"> Register </v-btn></router-link>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<style lang="scss" scoped>
.text--white {
  color: white !important;
}
</style>
