const API_KEY = process.env.TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

const api = {
  genres: (): Promise<any> => {
    const movieGenres = fetch(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}`
    ).then((res) => res.json());
    const tvGenres = fetch(
      `${BASE_URL}genre/tv/list?api_key=${API_KEY}`
    ).then((res) => res.json());

    return Promise.all([movieGenres, tvGenres]);
  },
  popularMovies: (): Promise<any> => {
    return fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`
    ).then((res) => res.json());
  },
  nowPlayingMovies: (): Promise<any> => {
    return fetch(
      `${BASE_URL}movie/now_playing?api_key=${API_KEY}&page=1`
    ).then((res) => res.json());
  },
  movie: (id: string | number): Promise<any> => {
    return fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres`
    ).then((res) => res.json());
  },
  popularTv: (): Promise<any> => {
    return fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}`).then((res) =>
      res.json()
    );
  },
  topRatedTv: (): Promise<any> => {
    return fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    );
  },
  tv: (id: string | number): Promise<any> => {
    return fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres`
    ).then((res) => res.json());
  },
  popularActors: (): Promise<any> => {
    return fetch(
      `${BASE_URL}person/popular?api_key=${API_KEY}&page=1`
    ).then((res) => res.json());
  },
  actor: (id: string | number): Promise<any> => {
    return fetch(
      `${BASE_URL}person/${id}?api_key=${API_KEY}&page=1&append_to_response=combined_credits,external_ids`
    ).then((res) => res.json());
  },
  search: (term: string): Promise<any> => {
    return fetch(
      `${BASE_URL}search/multi?api_key=${API_KEY}&include_adult=true&query=${term}`
    ).then((res) => res.json());
  },
};

export default api;
