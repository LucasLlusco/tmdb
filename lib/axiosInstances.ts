import axios from "axios";

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.TMDB_API_READ_ACCESS_TOKEN
  }
});

export { tmdbClient };