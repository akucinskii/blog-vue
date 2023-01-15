<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: false,
    default: "",
  },
  type: {
    type: String,
    required: false,
    default: "success",
  },
});

const type = computed(() => {
  if (props.type === "error") {
    return "error";
  } else {
    return "success";
  }
});
</script>

<template>
  <v-row class="my-4">
    <v-alert id="message" :type="type" :color="type" icon="mdi-alert-circle-outline" close text-color="white" my="2">
      {{ props.text }}
    </v-alert>
  </v-row>
</template>
