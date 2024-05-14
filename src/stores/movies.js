import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import IDs from './mock/imdb_top250'
import axios from '@/plugins/axios'

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

export const useMoviesStore = defineStore('movies', () => {
  const loader = ref(false)

  const top250Ids = ref(IDs)
  const moviesPerPage = ref(12)
  const currentPage = ref(1)
  const moviesList = ref({})
  const isSearch = ref(false)

  const sliceIDs = computed(() => {
    const from = currentPage.value * moviesPerPage.value - moviesPerPage.value;
    const to = currentPage.value * moviesPerPage.value
    return top250Ids.value.slice(from, to)
  })

  const moviesLength = computed(() => {
    return Object.keys(top250Ids.value).length
  })

  const fetchMovies = async () => {
    try {
      loader.value = true
      const moviesToFetch = sliceIDs.value;
      const request = moviesToFetch.map((id) => axios.get(`/?i=${id}`))
      const responce = await Promise.all(request)
      const movies = serializeResponse(responce)
      moviesList.value = movies
    } catch (err) {
      console.error(err)
    } finally {
      loader.value = false
    }
  }

  const changeCurrentPage = async (page) => {
    currentPage.value = page
    await fetchMovies()
  }

  const removeMovie = async (id) => {
    const index = top250Ids.value.findIndex((item) => item === id)
    if (index !== -1) {
      top250Ids.value.splice(index, 1)
      await fetchMovies()
    }
  }

  const searchMovue = async (query) => {
    try {
      loader.value = true
      const responce = await axios.get(`/?s=${query}`);

      if (responce.Error) {
        throw Error(responce.Error)
      }

      const movies = serializeResponse(responce.Search)
      moviesList.value = movies
    } catch (err) {
      console.error(err.message)
    } finally {
      loader.value = false
    }
  }

  return { fetchMovies, moviesList, currentPage, moviesPerPage, moviesLength, changeCurrentPage, loader, removeMovie, searchMovue, isSearch }
})
