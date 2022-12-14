import {
  faRightToBracket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authService } from "../fbase";
import { resizeState } from "../utils/atom";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleBox = styled.div<{ size: string }>`
  display: flex;
  font-size: ${(props) => (props.size === "Small" ? "15px" : "20px")};
  font-weight: bold;
`;
const Login = styled.h1<{ login: boolean; size: string }>`
  background-color: ${(props) =>
    props.login ? props.theme.blackColr : "white"};
  cursor: pointer;
  padding: ${(props) => (props.size === "Small" ? "15px" : "20px")};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: ${(props) => (props.login ? "white" : props.theme.blackColr)};
`;
const Join = styled.h1<{ login: boolean; size: string }>`
  cursor: pointer;
  padding: ${(props) => (props.size === "Small" ? "15px" : "20px")};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: ${(props) => (props.login ? props.theme.blackColr : "white")};
  background-color: ${(props) =>
    props.login ? "white" : props.theme.blackColr};
`;
const Form = styled.form<{ size: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.size === "Small" ? "90%" : "400px")};
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
`;
const Btn = styled(motion.button)`
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

type IInput = {
  email: string;
  password: string;
};

export const InputForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const size = useRecoilValue(resizeState);
  const { register, handleSubmit, setValue } = useForm<IInput>({
    mode: "onSubmit",
  });
  const history = useNavigate();
  const onValid = async (data: IInput) => {
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(
          authService,
          data.email,
          data.password
        );
        history("/");
        console.log("login");
      } catch {
        window.alert("?????????/??????????????? ??????????????????.????");
      }
    } else {
      try {
        await createUserWithEmailAndPassword(
          authService,
          data.email,
          data.password
        );
        setIsLogin(true);
        window.alert("???????????? ??????????");
        setValue("email", "");
        setValue("password", "");
      } catch {
        window.alert("?????? ?????????/?????????????????? ??????????????? ??????????????????.????");
      }
    }
  };
  const oninvalid = (errors: FieldErrors) => {
    if (errors.email) {
      window.alert(errors.email?.message);
    } else if (errors.password) {
      window.alert(errors.password?.message);
    } else {
      window.alert("???????????? ????????? ????????????");
    }
  };
  return (
    <Box>
      <TitleBox size={size}>
        <Login
          size={size}
          login={isLogin}
          onClick={() => {
            setIsLogin(true);
            setValue("email", "");
            setValue("password", "");
          }}
        >
          ?????????
        </Login>
        <Join
          size={size}
          login={isLogin}
          onClick={() => {
            setIsLogin(false);
            setValue("email", "");
            setValue("password", "");
          }}
        >
          ????????????
        </Join>
      </TitleBox>
      <Form onSubmit={handleSubmit(onValid, oninvalid)} size={size}>
        <Input
          {...register("email", { required: "???????????? ???????????????.????" })}
          type="email"
          placeholder="?????????"
        ></Input>
        <Input
          {...register("password", { required: "??????????????? ???????????????.????" })}
          type="password"
          placeholder="????????????"
        ></Input>
        <Btn whileHover={{ color: "#1A73E8" }} transition={{ duration: 0.3 }}>
          <FontAwesomeIcon
            size="xl"
            icon={isLogin ? faRightToBracket : faUserGroup}
          />
        </Btn>
      </Form>
    </Box>
  );
};
