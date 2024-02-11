export type MovieInList = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieInDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any;
  budget: number;
  genres: any[];
  homepage: string;
  id: number;
  release_date: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  title: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_contries: any[];
  vote_average: number;
};

export interface LikedMovies {
  Liked: boolean;
  poster: string;
  title: string;
}
