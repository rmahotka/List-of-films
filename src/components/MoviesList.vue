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
            @show-modal="onShowMovieInfo"
          />
        </v-col>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </v-row>
    <v-dialog v-model="dialog" width="auto">
      <v-card :max-width="1200">
        <MovieInfoModal :movie="selectedMovie" @close-modal="onCloseModal" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import MovieItem from './MovieItem.vue'
import MovieInfoModal from './MovieInfoModal.vue'

const moveStore = useMoviesStore()

const props = defineProps({
  list: {
    type: Object,
    default: () => ({})
  }
})

const dialog = ref(false)
const selectedMovieID = ref()

const listTitle = computed(() => {
  return moveStore.isSearch ? 'Search result' : 'IMDB Top 250'
})

const isExist = computed(() => {
  return Boolean(Object.keys(props.list).length)
})

const selectedMovie = computed(() => {
  return selectedMovieID.value ? props.list[selectedMovieID.value] : null
})

const onRemoveItem = ({ id, title }) => {
  let isBoss = confirm(`Remove movie ${title}?`)
  if (isBoss) {
    moveStore.removeMovie(id)
  }
}

const onCloseModal = () => {
  dialog.value = false
}

const onShowMovieInfo = (id) => {
  selectedMovieID.value = id
  dialog.value = true
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
