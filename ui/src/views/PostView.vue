<script setup lang="ts">
import ArticleComponent from "../components/Posts/Article/ArticleComponent.vue";
import ArticleNotFound from "../components/Posts/Article/ArticleNotFound.vue";
import { useRoute, useRouter } from "vue-router";
import { usePostsStore } from "../stores/posts";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { ArticleInterface } from "../types/types";
import ArticleLoading from "../components/Posts/Article/ArticleLoading.vue";
import { useUserStore } from "../stores/user";

const router = useRouter();
const route = useRoute();
const store = usePostsStore();
const userStore = useUserStore();

const { id } = route.params;
const PostId = Array.isArray(id) ? id[0] : id;
const { loading, error } = storeToRefs(store);

const post = ref<ArticleInterface | undefined>(undefined);
onMounted(async () => {
  await store.fetchPosts();
  post.value = store.getPostByUUID(PostId);
});

const deletePostHandler = async () => {
  await store.removePost(PostId);
  router.push("/");
};
</script>

<template>
  <div>
    <ArticleLoading v-if="loading" />
    <ArticleNotFound v-else-if="error || !post" />
    <ArticleComponent
      v-else
      :image-url="post.image_url"
      :date="post.date"
      :title="post.title"
      :text="post.text"
      :category="post.category.name"
      :author="post.author"
    />
    <v-row align="center" justify="center" class="mb-4">
      <v-btn v-if="userStore.user?.is_admin" id="deletePostButton" @click="deletePostHandler">delete this post</v-btn>
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>
