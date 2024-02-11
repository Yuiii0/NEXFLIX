import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Button, Input } from "../../Components/Input/Form";
import { updateName, updateNickName } from "../../store/reducers/user.reducer";

function MyPage() {
  const { name, nickname, location } = useSelector(
    (state) => state.user.profile
  );
  console.log(name, nickname, location);
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

  return (
    <Form>
      <Title>개인정보 수정</Title>
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
  margin-bottom: 4rem;
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
