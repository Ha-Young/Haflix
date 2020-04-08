import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {},
});

api.interceptors.request.use((config) => {
  config.params = {
    api_key: "1f596200a866eee0095aa8edc88d23c0",
    language: "ko-Kr",
    ...config.params,
  };
  return config;
});

export const movieAPI = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  topRated: () => api.get("movie/top_rated"),
  popular: () => api.get("movie/popular"),
  detail: (movie_id) => api.get(`movie/${movie_id}`, {
      params: {
          append_to_response: "videos"
      }
  }),
  search: (term) => api.get(`search/movie`, {
      params: {
          query: encodeURIComponent(term)
      }
  })
};

export const tvAPI = {
  airingToday: () => api.get("tv/airing_today"),
  top_rated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  detail: (tv_id) => api.get(`tv/${tv_id}`, {
      params: {
          append_to_response: "videos"
      }
  }),
  search: (term) => api.get(`search/tv`, {
      params: {
          query: encodeURIComponent(term)
      }
  })
};
