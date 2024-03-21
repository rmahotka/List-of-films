import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useMoviesStore = defineStore('movies', () => {

  const fetchMovies = async (context) => {
    const responce = await axios.get("/", {})
    console.log(responce);
  }

  return { fetchMovies }
})
