import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

const ColBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: tomato;
  height: 100%;
  padding: 10px;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const TextForm = styled(motion.form)<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "300px" : "400px")};
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
`;
const InputText = styled.textarea`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  font-family: "MonoplexKR-Regular";
  font-weight: bold;
  border-radius: 10px;
  padding-left: 45px;
`;
const TextBtn = styled.button<{ size: string }>`
  height: 50px;
  position: absolute;
  background-color: transparent;
  border: none;
  right: ${(props) => (props.size === "Small" ? "5px" : "20px")};
  color: white;
  font-family: "MonoplexKR-Regular";
  cursor: pointer;
  font-weight: bold;
`;

const Add = styled(motion.h1)`
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
`;
type Inter = {
  user: any;
  size: string;
};
export const EachDiary: React.FC<Inter> = ({ size, user }) => {
  const [write, setWrite] = useState(false);
  const [text, setText] = useState("");
  const onSubmit = () => {};
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };
  console.log(text);
  return (
    <>
      <ColBox>
        <InputBox>
          <TextForm
            onSubmit={onSubmit}
            size={size}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: write ? 1 : 0, opacity: write ? 1 : 0 }}
          >
            <InputText onChange={onChange} value={text} />
            <TextBtn size={size}>보내기</TextBtn>
          </TextForm>
          <Add
            whileHover={{ scale: 1.1 }}
            initial={{ x: 0 }}
            animate={{ x: write ? (size === "Small" ? 175 : 225) : 0 }}
            onClick={() => {
              setWrite(!write);
              setText("");
            }}
          >
            <FontAwesomeIcon icon={write ? faXmark : faPlus} />
          </Add>
        </InputBox>
      </ColBox>
    </>
  );
};
