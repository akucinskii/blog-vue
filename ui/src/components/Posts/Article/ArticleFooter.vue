<script setup lang="ts">
import { computed } from "vue";
//import robercik from "./robert.jpg";
const { avatar, username, description } = defineProps({
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  url: {
    type: String,
    required: false,
    default: "#",
  },
  username: {
    type: String,
    required: false,
    default: "Anonymous",
  },
  description: {
    type: String,
    required: false,
    default: "Placeholder description...",
  },
});

const shortDescription = computed(() => {
  if (description.length > 150) {
    return description.slice(0, 150).trim() + "...";
  } else {
    return description;
  }
});
</script>

<template>
  <v-row class="px-2">
    <v-col cols="12" sm="12">
      <v-row class="custom-grey pb-3">
        <v-col cols="12" md="4" class="d-flex justify-center align-center">
          <v-avatar color="custom-grey" size="100">
            <v-img :src="avatar" cover aspect-ratio="1/1" alt="Avatar image" />
          </v-avatar>
        </v-col>

        <v-col cols="12" md="8">
          <v-col id="postAuthor" sm="12">
            <strong>Published by:</strong>
            <br />
            <i>{{ username }}</i>
          </v-col>
          <v-col id="postDescription" sm="12" class="vuetify-text-wrap">
            {{ shortDescription }}
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
