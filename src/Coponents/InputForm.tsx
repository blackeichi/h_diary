import React, { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleBox = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
`;
const Login = styled.h1<{ login: boolean }>`
  background-color: ${(props) =>
    props.login ? props.theme.blackColr : "white"};
  cursor: pointer;
  padding: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: ${(props) => (props.login ? "white" : props.theme.blackColr)};
`;
const Join = styled.h1<{ login: boolean }>`
  cursor: pointer;
  padding: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: ${(props) => (props.login ? props.theme.blackColr : "white")};
  background-color: ${(props) =>
    props.login ? "white" : props.theme.blackColr};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  width: 400px;
`;

export const InputForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box>
      <TitleBox>
        <Login login={isLogin} onClick={() => setIsLogin(true)}>
          로그인
        </Login>
        <Join login={isLogin} onClick={() => setIsLogin(false)}>
          회원가입
        </Join>
      </TitleBox>
      <Form>
        <Input></Input>
        <Input></Input>
      </Form>
    </Box>
  );
};
