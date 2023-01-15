import { defineStore } from "pinia";
import { ArticleInterface } from "../types/types";
import apiRequest from "../utils/apiRequest";
import { HTTP_METHODS } from "../utils/apiRequest";
export interface RootState {
  posts: ArticleInterface[];
  loading: boolean;
  error: null | unknown;
}

export const usePostsStore = defineStore("posts", {
  state: () =>
    ({
      posts: [],
      loading: false,
      error: null,
    } as RootState),
  getters: {
    getPostByUUID: (state) => {
      return (postId: string) => state.posts.find((post) => post.id === postId);
    },
    getPostsByCategory: (state) => {
      return (category: string) => state.posts.filter((post) => post.category.id === category);
    },
  },
  actions: {
    async fetchPosts() {
      this.loading = true;
      try {
        this.posts = await apiRequest(HTTP_METHODS.GET, "/posts?page=1&size=50").then(
          (response) => response.data.items
        );
      } catch (e) {
        this.error = e;
        this.posts = [];
      }

      this.loading = false;
    },
    async removePost(postId: string) {
      await apiRequest(HTTP_METHODS.DELETE, `/posts?post_id=${postId}`);
    },
  },
});
