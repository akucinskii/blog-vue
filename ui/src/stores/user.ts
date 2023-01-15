import { defineStore } from "pinia";
import apiRequest, { HTTP_METHODS } from "../utils/apiRequest";

export type RootState = {
  user: {
    username: string;
    avatar_url: string;
    id: string;
    description: string;
    name: string;
    surname: string;
    is_admin: boolean;
  } | null;
};

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
    } as RootState),
  getters: {},
  actions: {
    async fetchUser() {
      try {
        const result = await apiRequest(HTTP_METHODS.GET, "/me", {});
        this.user = result.data;
      } catch (e) {
        this.user = null;
      }
    },

    logOut() {
      localStorage.removeItem("token");
      this.user = null;
    },
  },
});
