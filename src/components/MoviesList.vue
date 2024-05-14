<template>
  <v-container>
    <h3 class="title text-h3 text-white">{{ listTitle }}</h3>
    <v-row>
      <template v-if="isExist">
        <v-col cols="3" v-for="(movie, index) in props.list" :key="index">
          <MovieItem
            :movie="movie"
            @mouseover="onMouseOver(movie.Poster)"
            @remove-item="onRemoveItem"
            @showModel="onShowMovieInfo"
          />
        </v-col>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import MovieItem from './MovieItem.vue'

const moveStore = useMoviesStore()

const props = defineProps({
  list: {
    type: Object,
    default: () => ({})
  }
})

const listTitle = computed(() => {
  return moveStore.isSearch ? 'Search result' : 'IMDB Top 250'
})

const isExist = computed(() => {
  return Boolean(Object.keys(props.list).length)
})

const onRemoveItem = ({ id, title }) => {
  let isBoss = confirm(`Remove movie ${title}?`)
  if (isBoss) {
    moveStore.removeMovie(id)
  }
}

const onShowMovieInfo = (id) => {
  console.log(id)
}

const onMouseOver = (poster) => {
  emit('onChangePoster', poster)
}

const emit = defineEmits(['onChangePoster'])
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
</style>
