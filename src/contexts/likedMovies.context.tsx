import { createContext, useContext, useState } from "react";
import { LikedMovies, MovieInDetail } from "../api/movies/movies.response";

type LikedMoviesContextValue = {
  likedMovies: LikedMovies[];
  setLikedMovies: (movies: LikedMovies[]) => void;
  handleClickLikeBtn: (movie: MovieInDetail) => void;
  handleClickCancleLike: (movie: MovieInDetail) => void;
};

const initialValue: LikedMoviesContextValue = {
  likedMovies: [],
  setLikedMovies: () => {},
  handleClickLikeBtn: () => {},
  handleClickCancleLike: () => {},
};

const ProfileContext = createContext<LikedMoviesContextValue>(initialValue);

export const useLikedMovies = () => useContext(ProfileContext);

export function LikedMoviesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [likedMovies, setLikedMovies] = useState<LikedMovies[]>([]);

  const handleClickCancleLike = (movie: MovieInDetail) => {
    const { title } = movie;

    setLikedMovies(
      likedMovies.filter((likedMovie) => likedMovie.title !== title)
    );
  };
  const handleClickLikeBtn = (movie: MovieInDetail) => {
    const { title, poster_path } = movie;
    if (!likedMovies.some((movie) => movie.title === title)) {
      setLikedMovies([
        ...likedMovies,
        { Liked: true, title: title, poster: poster_path },
      ]);
    }
  };

  const value: LikedMoviesContextValue = {
    likedMovies,
    setLikedMovies,
    handleClickLikeBtn,
    handleClickCancleLike,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
