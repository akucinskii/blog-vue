<script setup lang="ts">
import NavbarLogo from "./NavbarLogo.vue";
import NavbarSocialMedia from "./NavbarSocialMedia.vue";
import NavbarSearch from "./NavbarSearch.vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import checkIsMobile from "../../utils/checkIsMobile";
import { useCategoriesStore } from "../../stores/categories";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";

const store = useCategoriesStore();
const userStore = useUserStore();
const router = useRouter();

const { categories } = storeToRefs(store);
const { user } = storeToRefs(userStore);
const drawer = ref(false);
const username = ref("");
const isMobile = ref(true);

const resizeHandler = () => {
  isMobile.value = checkIsMobile();
};

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  isMobile.value = checkIsMobile();
  if (categories.value.length === 0) {
    store.fetchCategories();
  }
});

watch(user, () => {
  username.value = user.value ? user.value.username : "";
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});

defineExpose({
  username,
});
</script>

<template>
  <v-app-bar v-if="!isMobile" id="desktop">
    <v-spacer />
    <v-row no-gutters>
      <v-col class="navbar__container--small">
        <NavbarLogo />
      </v-col>
      <v-col class="navbar__container--large">
        <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.id}`">
          <v-btn variant="text">
            {{ category.name }}
          </v-btn>
        </router-link>
      </v-col>
      <v-col class="navbar__container--small">
        <NavbarSearch />
        <NavbarSocialMedia />
        <div v-if="!username" class="d-flex">
          <router-link to="/login">
            <v-btn variant="tonal" class="mx-2" color="red"> Login </v-btn>
          </router-link>
          <router-link to="/register">
            <v-btn variant="plain"> Register </v-btn>
          </router-link>
        </div>
        <div v-else>
          <v-btn @click="router.push('/profile')">{{ username }}</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-spacer />
  </v-app-bar>

  <v-app-bar v-else id="mobile">
    <v-app-bar-nav-icon id="hamburgerMenu" variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer />

    <NavbarLogo />

    <v-spacer />

    <NavbarSocialMedia />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" class="py-4 m-0 text-center" bottom temporary>
    <v-list class="d-flex align-center flex-column"
      ><v-list-item v-for="category in categories" :key="category.id">
        <router-link :to="`/category/${category.id}`">
          <v-btn variant="text">
            {{ category.name }}
          </v-btn>
        </router-link>
      </v-list-item>
      <v-list-item v-if="!username">
        <router-link to="/login">
          <v-btn variant="tonal" class="mx-2" color="red"> Login </v-btn>
        </router-link>
      </v-list-item>
      <v-list-item v-if="!username">
        <router-link to="/register">
          <v-btn variant="plain"> Register </v-btn>
        </router-link>
      </v-list-item>

      <v-list-item v-else>
        <v-btn class="text--white" color="red" @click="router.push('/profile')">{{ username }}</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.navbar__container--large {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.navbar__container--small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
}
.text--white {
  color: white !important;
}
</style>
