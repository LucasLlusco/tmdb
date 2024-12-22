
export const tmdbUrls = {
  shared: { //both movies and tv
    "trending": (time:string) => `trending/all/${time}`,
    "popular": (type:string) => `discover/${type}`,
    "search": (type:string) => `search/${type}`,
  },
  movies: {
    "byId" : (id:string) => `movie/${id}`,
  },
  tv: {
    "" : ""
  }
}
