import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Button, Input } from "../../Components/Input/Form";
import { useLikedMovies } from "../../contexts/likedMovies.context";
import { updateName, updateNickName } from "../../store/reducers/user.reducer";
import { makeImagePath } from "../../utils/utils";

function MyPage() {
  const { name, nickname, location } = useSelector(
    (state) => state.user.profile
  );
  const { likedMovies, setLikedMovies, handleClickCancleLike } =
    useLikedMovies();

  const dispatch = useDispatch();

  const nameInputRef = useRef(null);
  const nickNameInputRef = useRef(null);

  const handleClickModifyName = (e) => {
    e.preventDefault();
    if (!name) alert("이름을 입력하세요");
    const nameAction = updateName(nameInputRef.current.value);
    dispatch(nameAction);
  };
  const handleClickModifyNickName = (e) => {
    if (!nickname) alert("닉네임을 입력해주세요");
    e.preventDefault();
    const nicknameAction = updateNickName(nickNameInputRef.current.value);
    dispatch(nicknameAction);
  };
  const handleclickCancel = (movie) => {
    handleClickCancleLike(movie);
  };

  return (
    <>
      <Form>
        <Title>개인정보</Title>
        <InputContainer>
          <InputLabel htmlFor="name">이름</InputLabel>
          <Input
            style={{ width: "100%" }}
            id="name"
            ref={nameInputRef}
            type="text"
            placeholder={name ? name : "이름"}
            required
          />
          <ModifyBtn onClick={handleClickModifyName}>수정</ModifyBtn>
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="nickName">닉네임</InputLabel>
          <Input
            style={{ width: "100%" }}
            id="nickName"
            ref={nickNameInputRef}
            type="text"
            placeholder={nickname ? nickname : "닉네임"}
            required
          />
          <ModifyBtn onClick={handleClickModifyNickName}>수정</ModifyBtn>
        </InputContainer>
      </Form>
      {likedMovies.length > 0 && (
        <LikedMoviesContainer>
          <Title>{nickname}님이 좋아요 한 영화 목록 🎥</Title>
          <LikedMovieList>
            {likedMovies.map((likeMovie) => (
              <LikedMovieItem key={likeMovie.title}>
                <LikedMovieImg
                  src={makeImagePath(likeMovie.poster, "w500")}
                  alt={likeMovie.title}
                />
                <TextContainer>
                  <h5>{likeMovie.title}</h5>
                  <span
                    class="material-symbols-outlined"
                    onClick={() => handleclickCancel(likeMovie)}
                    style={{ color: "red" }}
                  >
                    heart_minus
                  </span>
                </TextContainer>
              </LikedMovieItem>
            ))}
          </LikedMovieList>
        </LikedMoviesContainer>
      )}
    </>
  );
}

export default MyPage;

const Form = styled.form`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 25rem;
  transform: translateY(50%);
`;
const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 3rem;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;
const InputLabel = styled.label`
  width: 100px;
  text-align: center;
`;

const ModifyBtn = styled(Button)`
  width: 80px;
`;
const LikedMovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const LikedMovieItem = styled.li`
  padding: 3rem 0;
`;
const LikedMovieImg = styled.img`
  width: 200px;
  height: 300px;

  border-radius: 8px;
  object-fit: cover;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
export const CancleBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 10px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
  justify-content: flex-end;
`;

const LikedMoviesContainer = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
  transform: translateY(40%);
`;
