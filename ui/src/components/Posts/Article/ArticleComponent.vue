<script setup lang="ts">
import ArticleHeader from "./ArticleHeader.vue";
import ArticleFooter from "./ArticleFooter.vue";
import ArticleText from "./ArticleText.vue";
import ArticleImage from "./ArticleImage.vue";
import robercik from "../../../assets/robert.jpg";

const props = defineProps({
  imageUrl: {
    type: String,
    required: false,
    default: "",
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
  category: {
    type: String,
    required: false,
    default: "",
  },
  date: {
    type: String,
    required: false,
    default: "2020-01-01",
  },
  author: {
    type: Object,
    required: false,
    default: () => ({
      username: "",
      avatar_url: robercik,
      description: "",
    }),
  },
});
</script>

<template>
  <v-main class="mt-16">
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="6" class="m-0 mb-4">
          <ArticleHeader :category="props.category" :title="props.title" :date="props.date" />
          <ArticleImage :image-url="props.imageUrl" />
          <ArticleText :text="props.text" />
          <ArticleFooter
            :avatar="props.author.avatar_url"
            :username="props.author.username"
            :description="props.author.description"
          />
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped></style>
