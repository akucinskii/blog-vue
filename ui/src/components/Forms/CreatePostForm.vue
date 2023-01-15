<script setup lang="ts">
import { AxiosError } from "axios";
import { ref } from "vue";
import { useCategoriesStore } from "../../stores/categories";
import { MessageInterface, ResponseInterface } from "../../types/types";
import apiRequest, { HTTP_METHODS } from "../../utils/apiRequest";
import MessageComponent from "./MessageComponent.vue";

const categoriesStore = useCategoriesStore();

const message = ref<MessageInterface>({
  text: "",
  type: "success",
});

const postForm = ref({
  title: "",
  text: "",
  category_id: "",
  image_url: "",
  big_image_url: "robercik.jpg", //api needs this value, but it's not used
  disabled: false,
});

const handleCreatePost = async () => {
  try {
    await apiRequest(HTTP_METHODS.POST, "/posts", postForm.value);
    postForm.value = {
      title: "",
      text: "",
      category_id: "",
      image_url: "",
      big_image_url: "",
      disabled: false,
    };

    message.value = {
      text: "Post created successfully",
      type: "success",
    };
  } catch (error) {
    const err = error as AxiosError<ResponseInterface>;

    message.value.type = "error";
    message.value.text = err.response?.data.detail ?? "Something went wrong";
  }
};

defineExpose({
  message,
  postForm,
  handleCreatePost,
});
</script>

<template>
  <v-sheet elevation="3" rounded="lg" class="pa-8">
    <v-row cols="12">
      <v-col>
        <v-row justify="center" class="my-4">
          <h3>Add a post</h3>
        </v-row>

        <MessageComponent v-if="message.text" :type="message.type" :text="message.text" />

        <v-form @submit.prevent="handleCreatePost">
          <v-text-field
            id="titleInput"
            v-model="postForm.title"
            label="Title"
            variant="underlined"
            type="text"
            autofocus
          ></v-text-field>
          <v-textarea
            id="descriptionInput"
            v-model="postForm.text"
            label="description"
            variant="underlined"
          ></v-textarea
          ><v-text-field
            id="image_urlInput"
            v-model="postForm.image_url"
            label="image_url"
            variant="underlined"
          ></v-text-field>
          <v-select
            id="categorySelect"
            v-model="postForm.category_id"
            :items="categoriesStore.categories"
            item-title="name"
            item-value="id"
            label="category"
            variant="underlined"
          ></v-select>

          <v-row justify="center" class="mb-4">
            <v-btn id="submitButton" color="red" class="text--white px-8" type="submit">Submit</v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss">
.text--white {
  color: white !important;
}
</style>
