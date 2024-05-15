<template>
  <LoaderItem />
  <HeaderItem />
  <PosterBg :poster="posterData" />
  <MoviesList :list="moveStore.moviesList" @on-change-poster="onChangePoster" />
  <MoviePagination
    :current-page="moveStore.currentPage"
    :per-page="moveStore.moviesPerPage"
    :total="moveStore.moviesLength"
    @page-changed="onPageChanged"
  />
</template>

<script setup>
import { useMoviesStore } from '@/stores/movies'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MoviesList from './components/MoviesList.vue'
import PosterBg from './components/PosterBg.vue'
import MoviePagination from './components/MoviePagination.vue'
import LoaderItem from './components/LoaderItem.vue'
import HeaderItem from './components/HeaderItem.vue'

const moveStore = useMoviesStore()
const router = useRouter()
const route = useRoute()

const posterData = ref('')

const onChangePoster = (poster) => {
  posterData.value = poster
}

const onPageChanged = (page) => {
  router.push({ path: '/', query: { page } })
}

const onPageQueryChange = ({ page = 1 }) => {
  moveStore.changeCurrentPage(Number(page))
}

watch(() => route.query, onPageQueryChange)
</script>

<style scoped></style>
