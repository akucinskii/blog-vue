<script setup lang="ts">
import { AxiosError } from "axios";
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import { MessageInterface, ResponseInterface } from "../../types/types";
import apiRequest, { HTTP_METHODS } from "../../utils/apiRequest";
import MessageComponent from "./MessageComponent.vue";

const userStore = useUserStore();
const message = ref<MessageInterface>({
  text: "",
  type: "success",
});

const userForm = ref({
  username: userStore.user ? userStore.user.username : "",
  avatar_url: userStore.user ? userStore.user.avatar_url : "",
  id: userStore.user ? userStore.user.id : "",
  description: userStore.user ? userStore.user.description : "",
  name: userStore.user ? userStore.user.name : "",
  surname: userStore.user ? userStore.user.surname : "",
  is_admin: userStore.user ? userStore.user.is_admin : false,
});

const handleUpdateUser = async () => {
  if (!userStore.user) {
    message.value = {
      text: "You are not logged in",
      type: "error",
    };
    return;
  }
  try {
    await apiRequest(HTTP_METHODS.PATCH, `/users/update?user_to_change_id=${userStore.user.id}`, userForm.value);
    userStore.fetchUser();
    message.value = {
      text: "User updated",
      type: "success",
    };
  } catch (error) {
    const err = error as AxiosError<ResponseInterface>;

    message.value.type = "error";
    message.value.text = err.response?.data.detail ?? "Something went wrong";
  }
};
</script>

<template>
  <v-form @submit.prevent="handleUpdateUser">
    <MessageComponent v-if="message.text" :type="message.type" :text="message.text" />
    <v-row class="" justify="space-between">
      <v-col>
        <v-text-field
          id="nameInput"
          v-model="userForm.name"
          prepend-icon="mdi-account"
          label="name"
          variant="underlined"
          type="name"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          id="surnameInput"
          v-model="userForm.surname"
          prepend-icon="mdi-account"
          label="surname"
          variant="underlined"
          type="surname"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      id="avatar_urlInput"
      v-model="userForm.avatar_url"
      prepend-icon="mdi-image"
      label="avatar_url"
      variant="underlined"
      type="avatar_url"
      required
    ></v-text-field>
    <v-text-field
      id="descriptionInput"
      v-model="userForm.description"
      prepend-icon="mdi-text-box"
      label="description"
      variant="underlined"
      type="description"
      required
    >
    </v-text-field>
    <v-row justify="center" class="mb-4">
      <v-btn id="updateUserButton" class="px-8" type="submit">Update user</v-btn>
    </v-row>
  </v-form>
</template>
