<script lang="ts" setup>
import PostList from "../components/Posts/PostList.vue";
import ArticleThumbnail from "../components/Posts/Article/ArticleThumbnail.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePostsStore } from "../stores/posts";
import { useCategoriesStore } from "../stores/categories";
import { ArticleInterface, CategoryInterface } from "../types/types";
import { computed } from "vue";

const route = useRoute();
const postStore = usePostsStore();
const categoriesStore = useCategoriesStore();
const category = ref<undefined | CategoryInterface>({} as CategoryInterface);
const posts = ref([] as ArticleInterface[]);

const fetchPostsByCategory = async () => {
  await postStore.fetchPosts();
  await categoriesStore.fetchCategories();

  const uuid = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  category.value = categoriesStore.getCategoryByUUID(uuid);
  posts.value = postStore.getPostsByCategory(uuid);
};

const data = computed(() => {
  return posts.value.filter((post) => post.disabled === false);
});

fetchPostsByCategory();

watch(route, fetchPostsByCategory);

defineExpose({
  route,
  posts,
  category,
});
</script>

<template>
  <v-main class="mt-8">
    <v-col v-if="category" id="categoryTitle" class="text-center"
      ><h1>Posts in {{ category.name }}</h1>
    </v-col>
    <PostList v-if="data.length > 0">
      <v-col v-for="post in data" :key="post.id" class="post" cols="12" md="6" xl="6">
        <ArticleThumbnail
          v-if="!post.disabled"
          :id="post.id"
          :url="post.image_url"
          :author="post.author"
          :title="post.title"
          :category="post.category.name"
          :text="post.text"
        />
      </v-col>
    </PostList>
    <v-col v-else class="text-center"><h3>No posts found in this category :(</h3></v-col>
  </v-main>
</template>

<script lang="scss" scoped></script>
