<script lang="ts" setup>
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MessageInterface, ResponseInterface } from "../../types/types";
import apiRequest, { HTTP_METHODS } from "../../utils/apiRequest";
import NavbarLogo from "../navbar/NavbarLogo.vue";
import MessageComponent from "./MessageComponent.vue";

const router = useRouter();

const message = ref<MessageInterface>({
  text: "",
  type: "success",
});
const secret = ref("");
const passwordConfirmation = ref("");

const valid = ref(false);
const user = ref({
  password: "",
  username: "",
  name: "",
  surname: "",
  avatar_url: "",
  description: "",
  is_admin: false,
});

const usernameRules = [
  (v: string) => !!v || "Username is required",
  (v: string) => v.length >= 3 || "Username must be at least 3 characters",
  (v: string) => v.length <= 20 || "Username must be less than 20 characters",
];
const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 8 || "Password must be at least 8 characters",
  (v: string) => v.length <= 20 || "Password must be less than 20 characters",
  (v: string) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
  (v: string) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
  (v: string) => /[0-9]/.test(v) || "Password must contain at least one number",
  (v: string) => /[^a-zA-Z0-9]/.test(v) || "Password must contain at least one special character",
];

const passwordConfirmationRules = [
  (v: string) => !!v || "Password confirmation is required",
  (v: string) => v === user.value.password || "Passwords do not match",
];

const handleRegister = async () => {
  user.value.is_admin = secret.value == "lewandowski";
  try {
    await apiRequest(HTTP_METHODS.POST, "/users", user.value);

    message.value.text = "User created successfully";
    message.value.type = "success";

    router.push("/");
  } catch (error) {
    const err = error as AxiosError<ResponseInterface>;
    message.value.text = err.response?.data?.detail ?? "Something went wrong";
    message.value.type = "error";
  }
};

defineExpose({
  message,
  passwordConfirmation,
  valid,
  user,
  usernameRules,
  passwordRules,
  passwordConfirmationRules,
  handleRegister,
});
</script>

<template>
  <v-sheet elevation="23" rounded="lg" class="pa-8">
    <v-row justify="center" class="my-4">
      <NavbarLogo />
    </v-row>
    <MessageComponent v-if="message.text" :type="message.type" :text="message.text" />
    <v-form v-model="valid" @submit.prevent="handleRegister">
      <v-text-field
        v-model="user.username"
        prepend-icon="mdi-account"
        label="username"
        :rules="usernameRules"
        variant="underlined"
        type="username"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        prepend-icon="mdi-lock"
        :rules="passwordRules"
        label="Password"
        variant="underlined"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="passwordConfirmation"
        prepend-icon="mdi-lock-check"
        :rules="passwordConfirmationRules"
        label="Confirm your password"
        variant="underlined"
        type="password"
        required
      ></v-text-field>
      <v-row class="" justify="space-between">
        <v-col>
          <v-text-field
            v-model="user.name"
            prepend-icon="mdi-account"
            label="name"
            variant="underlined"
            type="name"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="user.surname"
            prepend-icon="mdi-account"
            label="surname"
            variant="underlined"
            type="surname"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-text-field
        v-model="user.avatar_url"
        prepend-icon="mdi-image"
        label="avatar_url"
        variant="underlined"
        type="avatar_url"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.description"
        prepend-icon="mdi-text-box"
        label="description"
        variant="underlined"
        type="description"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="secret"
        prepend-icon="mdi-shield"
        variant="underlined"
        label="Secret password 😏"
      ></v-text-field>
      <v-row justify="center" class="mb-4">
        <v-btn id="submitButton" color="red" class="text--white px-8" :disabled="!valid" type="submit">Register</v-btn>
      </v-row>
      <v-row justify="center">
        <router-link to="/login"><v-btn variant="text" class="text--gray"> Login </v-btn></router-link>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<style lang="scss" scoped>
.text--white {
  color: white !important;
}
.text--gray {
  color: gray !important;
}
</style>
