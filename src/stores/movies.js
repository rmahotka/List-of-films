import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import IDs from './mock/imdb_top250'
import axios from '@/plugins/axios'

function serializeResponce(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

export const useMoviesStore = defineStore('movies', () => {

  const top250Ids = ref(IDs)
  const moviesPerPage = ref(12)
  const currentPage = ref(1)
  const moviesObj = ref({})

  const slicedIDs = computed(() => {
    const from = currentPage.value * moviesPerPage.value - moviesPerPage.value;
    const to = currentPage.value * moviesPerPage.value
    return top250Ids.value.slice(from, to)
  })

  const fetchMovies = async () => {
    try {
      const moviesToFetch = slicedIDs.value;
      const request = moviesToFetch.map((id) => axios.get(`/?i=${id}`))
      const responce = await Promise.all(request)
      const movies = serializeResponce(responce)
      moviesObj.value = movies
    } catch (err) {
      console.error(err)
    }
  }

  return { fetchMovies, slicedIDs, moviesObj, moviesPerPage, currentPage }
})
