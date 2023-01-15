<script setup lang="ts">
import { computed } from "vue";
import robercik from "../../../assets/robert.jpg";
const props = defineProps({
  url: {
    type: String,
    required: false,
    default: robercik,
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  text: {
    type: String,
    required: false,
    default: "",
  },
  author: {
    type: Object,
    required: false,
    default: () => ({
      username: "",
      avatar: "",
      description: "",
    }),
  },
  category: {
    type: String,
    required: false,
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
});

const shorterText = computed(() => {
  return props.text.slice(0, 150).trim() + "...";
});
</script>

<template>
  <router-link :to="`/post/${id}`">
    <v-card flat class="d-flex flex-column text-center" height="100%">
      <v-img class="image" cover :alt="url" max-height="250" :src="url"></v-img>
      <v-card-header>
        <v-card-header-text>
          <v-card-title class="vuetify-text-center vuetify-break-word text-h5">{{ title }}</v-card-title>
          <v-chip color="red" class="my-3" size="small" @click="() => {}">{{ category }}</v-chip>
          <v-card-subtitle class="vuetify-text-center">Author: {{ author.username }}</v-card-subtitle>
          <v-card-content class="pt-0"> {{ shorterText }}</v-card-content>
        </v-card-header-text>
      </v-card-header>
      <v-spacer />
      <v-card-actions class="d-flex justify-center">
        <v-btn class="align-self-end" variant="text"> read more... </v-btn>
      </v-card-actions>
    </v-card>
  </router-link>
</template>

<style lang="scss" scoped></style>
