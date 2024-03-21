<template>
  <v-btn prepend-icon="$vuetify"> Button </v-btn>
</template>

<script setup>
import { useMoviesStore } from '@/stores/movies'
import { onMounted } from 'vue'

const moveStore = useMoviesStore()

onMounted(() => {
  moveStore.fetchMovies()
})
</script>

<style scoped></style>
