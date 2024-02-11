import styled from "styled-components";

export const Input = styled.input`
  padding: 12px 10px;
  border-radius: 8px;
  border: none;
  outline: none;

  &:focus {
    background-color: gainsboro;
  }
`;
export const Button = styled.button`
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
