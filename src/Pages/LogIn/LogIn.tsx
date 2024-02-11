import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth.context";

function LogInPage() {
  const { isLoggedIn, logIn } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignIn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userName || !password)
      return alert("아이디 또는 비밀번호를 입력해주세요");

    if (userName === "id" && password === "password") {
      logIn();
    } else {
      return alert("아이디 또는 비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <div>
      <FormWrapper>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="아이디를 입력해주세요"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
        <Button onClick={handleClickSignIn}>로그인하기</Button>
      </FormWrapper>
    </div>
  );
}

export default LogInPage;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  row-gap: 16px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Input = styled.input`
  padding: 12px 10px;
  border-radius: 8px;
  border: none;
  outline: none;

  &:focus {
    background-color: rgb(220, 220, 220);
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 12px 10px;
  background-color: red;
  color: white;
  font-weight: 600;

  &:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;
