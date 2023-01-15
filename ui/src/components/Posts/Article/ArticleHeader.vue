<script setup lang="ts">
const { title, date, category } = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  date: {
    type: String,
    required: false,
    default: "2020-01-01",
  },
  category: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <v-row>
    <v-col id="postTitle" cols="12" sm="12" class="text-center">
      <h1 class="vuetify-break-word">{{ title }}</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col id="postDate" cols="12" sm="12" class="text-center">
      <h2 class="text-body-1">{{ date }}</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col id="postCategory" cols="12" sm="12" class="text-center">
      <v-chip color="red" class="my-3" size="large" @click="() => {}">{{ category }}</v-chip>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
