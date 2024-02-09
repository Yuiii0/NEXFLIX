import { MovieInDetail, MovieInList } from "./movies.response";
const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

type TMDBMovieListData = {
  dates: { maximum: string; minimum: string };
  page: number;
  results: MovieInList[];
  total_pages: number;
  total_results: number;
};
const BASE_URL = "https://api.themoviedb.org/3/movie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

const getMovies = async (type: "nowPlaying" | "topRated") => {
  const endpoints = {
    nowPlaying: `${BASE_URL}/now_playing?language=ko-KR&region=KR&page=1`,
    topRated: "/top_rated?language=ko-KR&region=KR&page=1",
  };

  const response = await fetch(endpoints[type], options);
  const data = await response.json();
  const movies = data.results;
  return movies as MovieInList[];
};

const getMovie = async (movieId: number) => {
  const endpoint = `${BASE_URL}/${movieId}?language=ko-KR`;
  const response = await fetch(endpoint, options);
  const data = await response.json();

  return data as MovieInDetail;
};

const moviesAPI = {
  getMovies,
  getMovie,
};

export default moviesAPI;
