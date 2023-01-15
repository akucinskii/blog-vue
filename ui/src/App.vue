<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

onMounted(async () => {
  if (localStorage.getItem("token")) {
    try {
      await userStore.fetchUser();
    } catch (error) {
      localStorage.removeItem("token");
    }
  }
});
</script>

<template>
  <v-app>
    <RouterView name="Navbar" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<style lang="scss">
@import "./styles/globals";
a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
