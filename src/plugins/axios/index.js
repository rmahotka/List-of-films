import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  params: {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    plot: "full",
    i: "tt3896198"
  }
})

export default instance