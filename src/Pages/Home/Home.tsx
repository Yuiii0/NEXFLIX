import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { makeImagePath } from "../../utils/utils";
import Movie from "./components/Movie";

const MovieListVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};
const offset = 5;

const MovieItemVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const MovieInfoVariatns = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

function Home() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", { type: "nowPlaying" }],
    queryFn: () => api.movies.getMovies("nowPlaying"),
  });

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");
  const navigate = useNavigate();
  const { movieId } = useParams();

  const selectedMovie = movies?.find((movie) => movie.id == Number(movieId));
  console.log(selectedMovie);

  const increaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movies.length;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  if (isLoading || !movies) return <Loader>Loading</Loader>;

  const handleClickMovie = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const handleClickOverlay = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <Banner
        onClick={increaseIndex}
        bgPhoto={makeImagePath(movies[0]?.backdrop_path) || ""}
      >
        <Title>{movies?.[0].title}</Title>
        <OverView>{movies?.[0].overview}</OverView>
      </Banner>
      <Slider>
        <AnimatePresence onExitComplete={toggleLeaving}>
          <MovieList
            variants={MovieListVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {movies
              ?.slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <MovieItem
                  layoutId={movie.id + ""}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={MovieItemVariants}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  onClick={() => handleClickMovie(movie.id)}
                >
                  <MovieInfo variants={MovieInfoVariatns}>
                    <h4>{movie.title}</h4>
                  </MovieInfo>
                </MovieItem>
              ))}
          </MovieList>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {moviePathMatch && (
          <>
            <Overlay
              onClick={handleClickOverlay}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            {selectedMovie && (
              <MovieDetail layoutId={moviePathMatch.params.movieId}>
                <Movie movieId={movieId || ""}></Movie>
              </MovieDetail>
            )}
          </>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background-color: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 20px;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -250px;
`;
const MovieList = styled(motion.div)`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;

const MovieItem = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
`;

const MovieInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieDetail = styled(motion.div)`
  position: fixed;
  width: 35vw;
  background-color: ${(props) => props.theme.black.lighter};
  color: white;
  height: 80vh;
  top: 70px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
`;
