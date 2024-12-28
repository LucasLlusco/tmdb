
export const tmdbUrls = {
  shared: { //both movies and tv
    "trending": (time:string) => `trending/all/${time}`,
    "popular": (type:string) => `discover/${type}`,
    "search": (type:string) => `search/${type}`, 
  },
  movies: {
    "byId" : (id:string) => `movie/${id}`,
    "creditsById":(id:string) => `movie/${id}/credits`,
    "imagesById": (id:string) => `movie/${id}/images`,
    "videosById": (id:string) => `movie/${id}/videos`,
    "recommendationsById": (id:string) => `movie/${id}/recommendations`,
  },
  tv: {
    "" : ""
  }
}