export const tmdbUrls = {
  shared: { //both movies and tv
    "trending": (time:string) => `/trending/all/${time}`,
    "popular": (type:string) => `/discover/${type}`,
    "search": (type:string) => `/search/${type}`, 
    "discover": (type:string) => `/discover/${type}`,
    "availableRegions": `/watch/providers/regions`,
    "providersByRegion": (type:string) => `/watch/providers/${type}`,
    "genres": (type:string) => `/genre/${type}/list`,
    "imagesById": (id:number, type: "movie" | "tv") => `/${type}/${id}/images`,
    "videosById": (id:number, type: "movie" | "tv") => `/${type}/${id}/videos`,
    "keywordsById": (id:number, type: "movie" | "tv") => `/${type}/${id}/keywords`,
  },
  movies: {
    "byId" : (id:number) => `/movie/${id}`,
    "creditsById":(id:number) => `/movie/${id}/credits`,
    "recommendationsById": (id:number) => `/movie/${id}/recommendations`,
    "collectionById": (id:number) => `/collection/${id}`
  },
  tvShows: {
    "byId" : (id:number) => `/tv/${id}`,
    "aggregateCreditsById":(id:number) => `/tv/${id}/aggregate_credits`,
    "recommendationsById": (id:number) => `/tv/${id}/recommendations`,
    "seasonById": (id:number, season_number: number) => `/tv/${id}/season/${season_number}`,
  }
}