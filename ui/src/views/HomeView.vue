<script setup lang="ts">
import PostList from "../components/Posts/PostList.vue";
import ArticleThumbnail from "../components/Posts/Article/ArticleThumbnail.vue";
import { usePostsStore } from "../stores/posts";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = usePostsStore();
const { posts } = storeToRefs(store);

onMounted(async () => {
  await store.fetchPosts();
});

const data = computed(() => {
  return posts.value.filter((post) => post.disabled === false);
});
</script>

<template>
  <v-main>
    <PostList v-if="data">
      <v-col v-for="post in data" :key="post.id" cols="12" md="6" xl="6">
        <ArticleThumbnail
          :id="post.id"
          :url="post.image_url"
          :author="post.author"
          :title="post.title"
          :category="post.category.name"
          :text="post.text"
        />
      </v-col>
    </PostList>
  </v-main>
</template>

<style lang="scss" scoped></style>
