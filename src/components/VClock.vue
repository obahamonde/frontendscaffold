<script setup lang="ts">
const now = useNow();
const time = computed(() => now.value.toLocaleTimeString());
</script>
<template>
  <h1 class="tr fixed text-lg row center m-4" text-primary>{{ time }}</h1>
</template>
