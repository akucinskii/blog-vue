<script setup lang="ts">
import { AxiosError } from "axios";
import { ref } from "vue";
import { useCategoriesStore } from "../../stores/categories";
import { MessageInterface, ResponseInterface } from "../../types/types";
import apiRequest, { HTTP_METHODS } from "../../utils/apiRequest";
import MessageComponent from "./MessageComponent.vue";

const categoriesStore = useCategoriesStore();
const categoryRules = [(v: string) => !!v || "Category cannot be empty"];

const valid = ref(false);

const addCategoryMessage = ref<MessageInterface>({
  text: "",
  type: "success",
});

const deleteCategoryMessage = ref<MessageInterface>({
  text: "",
  type: "success",
});

const categoryName = ref("");
const categoryId = ref("");

const handleCreateCategory = async () => {
  try {
    await apiRequest(HTTP_METHODS.POST, "/categories", { name: categoryName.value });

    categoryName.value = "";
    categoriesStore.fetchCategories();

    addCategoryMessage.value = {
      text: "Category added successfully",
      type: "success",
    };
  } catch (error) {
    const err = error as AxiosError<ResponseInterface>;

    addCategoryMessage.value.text = err.response?.data.detail ?? "Something went wrong";
    addCategoryMessage.value.type = "error";
  }
};

const handleDeleteCategory = async () => {
  try {
    await apiRequest(HTTP_METHODS.DELETE, `/categories?category_id=${categoryId.value}`);

    await categoriesStore.fetchCategories();
    categoryId.value = "";

    deleteCategoryMessage.value = {
      text: "Category deleted successfully",
      type: "success",
    };
  } catch (error) {
    const err = error as AxiosError<ResponseInterface>;

    deleteCategoryMessage.value.text = err.response?.data.detail ?? "Something went wrong";
    deleteCategoryMessage.value.type = "error";
  }
};

defineExpose({
  valid,
  addCategoryMessage,
  deleteCategoryMessage,
  categoryName,
  categoryId,
  handleCreateCategory,
  handleDeleteCategory,
  categoryRules,
});
</script>

<template>
  <v-sheet elevation="3" class="my-4 pa-2" rounded="lg">
    <v-col>
      <v-row justify="center" class="my-4">
        <h3>Add a Category</h3>
      </v-row>

      <MessageComponent
        v-if="addCategoryMessage.text"
        id="addCategoryMessage"
        :type="addCategoryMessage.type"
        :text="addCategoryMessage.text"
      />

      <v-form id="addCategory" v-model="valid" @submit.prevent="handleCreateCategory">
        <v-text-field
          id="categoryNameInput"
          v-model="categoryName"
          :rules="categoryRules"
          label="Category name"
          variant="underlined"
          type="text"
          autofocus
        ></v-text-field>

        <v-row justify="center" class="mb-4">
          <v-btn id="submitAddButton" color="red" :disabled="!valid" class="text--white px-8" type="submit"
            >Submit</v-btn
          >
        </v-row>
      </v-form>
    </v-col>

    <v-col>
      <v-row justify="center" class="my-4">
        <h3>Delete category</h3>
      </v-row>

      <MessageComponent
        v-if="deleteCategoryMessage.text"
        id="deleteCategoryMessage"
        :type="deleteCategoryMessage.type"
        :text="deleteCategoryMessage.text"
      />

      <v-form id="deleteCategory" @submit.prevent="handleDeleteCategory">
        <v-select
          id="categorySelect"
          v-model="categoryId"
          :items="categoriesStore.categories"
          item-title="name"
          item-value="id"
          label="category"
          variant="underlined"
        ></v-select>
        <v-row justify="center" class="mb-4">
          <v-btn id="submitDeleteButton" color="red" class="text--white px-8" type="submit">Submit</v-btn>
        </v-row>
      </v-form>
    </v-col>
  </v-sheet>
</template>

<style lang="scss" scoped>
.text--white {
  color: white !important;
}
</style>
