import { defineStore } from "pinia";
import { CategoryInterface } from "../types/types";
import apiRequest, { HTTP_METHODS } from "../utils/apiRequest";

export interface RootState {
  categories: CategoryInterface[];
  //selectedCategory: CategoryInterface | null;
}

export const useCategoriesStore = defineStore("categories", {
  state: () =>
    ({
      categories: [],
    } as RootState),
  getters: {
    getCategoryByUUID: (state) => {
      return (categoryId: string) => state.categories.find((category) => category.id === categoryId);
    },
  },
  actions: {
    async fetchCategories() {
      try {
        this.categories = await apiRequest(HTTP_METHODS.GET, "/categories?page=1&size=50").then(
          (response) => response.data.items
        );
      } catch (e) {
        this.categories = [];
      }
    },
  },
});
