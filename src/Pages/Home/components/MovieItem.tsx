// import { motion } from 'framer-motion';
// import styled from "styled-components";

// function MovieItem() {
//   return (
//     <MovieDetail layoutId={moviePathMatch.params.movieId}>
//       <MovieImg
//         style={{
//           backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
//             selectedMovie.backdrop_path,
//             "w500"
//           )})`,
//         }}
//       />
//       <MovieTitle>{selectedMovie.title}</MovieTitle>
//       <MovieReleaseDate>{selectedMovie.release_date}</MovieReleaseDate>
//       <MovieRating>{selectedMovie.popularity}</MovieRating>

//       <MovieOverView>{selectedMovie.overview}</MovieOverView>
//     </MovieDetail>
//   );
// }
// export default MovieItem;

// const MovieDetail = styled(motion.div)`
//   position: fixed;
//   width: 40vw;
//   background-color: ${(props) => props.theme.black.lighter};
//   color: white;
//   height: 80vh;
//   top: 70px;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   border-radius: 16px;
//   overflow: hidden;
// `;
// const MovieImg = styled.div`
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   height: 400px;
// `;

// const MovieTitle = styled.h2`
//   color: ${(props) => props.theme.white.lighter};
//   font-size: 28px;
//   padding: 20px;
//   position: relative;
//   top: -60px;
// `;
// const MovieOverView = styled.p`
//   padding: 20px;
//   color: ${(props) => props.theme.white.lighter};
//   position: relative;
// `;
// const MovieReleaseDate = styled.p``;
// const MovieRating = styled.p``;
