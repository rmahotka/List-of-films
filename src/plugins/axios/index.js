import axios from "axios";
import interceptros from "./interceptros";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

interceptros(instance)

export default instance