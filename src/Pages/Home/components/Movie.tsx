import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import api from "../../../api/api";
import { MovieInDetail } from "../../../api/movies/movies.response";
import { useLikedMovies } from "../../../contexts/likedMovies.context";
import { makeImagePath } from "../../../utils/utils";

function Movie({ movieId }: { movieId: string }) {
  const { likedMovies, setLikedMovies, handleClickCancleLike } =
    useLikedMovies();
  // const [movieDetail, setMovieDetail] = useState({});

  const { data: movie } = useQuery({
    queryKey: ["movie"],
    queryFn: () => api.movies.getMovie(Number(movieId)),
  });

  const handleClickLike = (movie: MovieInDetail) => {
    console.log("좋아요");
    const { title, poster_path } = movie;
    if (!likedMovies.some((movie) => movie.title === title)) {
      setLikedMovies([
        ...likedMovies,
        { Liked: true, title: title, poster: poster_path },
      ]);
    }
  };
  const handleclickCancel = (movie: MovieInDetail) => {};

  console.log("deatil 좋아요 누른", likedMovies);

  return (
    <div>
      {movie && (
        <>
          <Img
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                movie.backdrop_path,
                "w500"
              )})`,
            }}
          />
          <Title>{movie?.original_title}</Title>

          <DetailContainer>
            <Genres>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{`${genre.name}`}</li>
              ))}
            </Genres>
            <Container>
              <ReleaseDate>{movie?.release_date}</ReleaseDate>
              <Rating>{movie?.vote_average}</Rating>
              {!likedMovies.some(
                (likedMovie) => likedMovie.title === movie.title
              ) ? (
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleClickLike(movie)}
                  style={{ color: "red" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleclickCancel(movie)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  heart_check
                </span>
              )}
            </Container>

            <OverView>{movie?.overview}</OverView>
          </DetailContainer>
        </>
      )}
    </div>
  );
}
export default Movie;

const Img = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 300px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  position: relative;
  top: -50px;
  padding-left: 20px;
  font-weight: 500;
`;
const OverView = styled.p`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  font-size: 14px;
`;
const Genres = styled.ul`
  display: flex;
  gap: 10px;
  font-size: 14px;
  position: relative;
  top: -8px;
  margin-bottom: 10px;
`;
const DetailContainer = styled.div`
  position: relative;
  top: -10px;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ReleaseDate = styled.p`
  font-size: 14px;
`;
const Rating = styled.p`
  color: ${(props) => props.theme.red};
  font-weight: 500;
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 20px;
`;
