import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ChangeNickname, menuOpenState, writeState } from "../utils/atom";
import { FlexBox } from "../utils/Styled";

const Header = styled.div`
  width: 100%;
  height: 10%;
  min-height: 60px;
  background-color: ${(props) => props.theme.blueColr};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;
const Toggle = styled.div<{ open: boolean; size: string }>`
  background-color: ${(props) => props.theme.blackColr};
  width: ${(props) => (props.size === "Mid" ? "10vw" : "60px")};
  height: ${(props) => (props.size === "Mid" ? "6vw" : "36px")};
  max-width: 100px;
  max-height: 60px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  justify-content: ${(props) => (props.open ? "flex-end" : "flex-start")};
  box-sizing: border-box;
  position: absolute;
  left: ${(props) =>
    props.size === "Mid" ? "60px" : props.size === "Small" ? "20px" : "40px"};
`;
const ToggleBtn = styled(motion.div)<{ size: string }>`
  background-color: white;
  border-radius: 50%;
  max-width: 40px;
  max-height: 40px;
  width: ${(props) => (props.size === "Mid" ? "4vw" : "24px")};
  height: ${(props) => (props.size === "Mid" ? "4vw" : "24px")};
`;
const Icon = styled(motion.div)<{ size: string }>`
  color: ${(props) => props.theme.blackColr};
  background-color: white;
  width: ${(props) => (props.size === "Small" ? "30px" : "40px")};
  height: ${(props) => (props.size === "Small" ? "30px" : "40px")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const HeaderContent = styled.div<{ size: string }>`
  display: flex;
  color: white;
  align-items: center;
  gap: ${(props) => (props.size === "Small" ? "10px" : "15px")};
  font-size: ${(props) => (props.size === "Small" ? "14px" : "18px")};
  font-family: "MonoplexKR-Italic";
`;

const Text = styled(motion.h1)``;

type Interface = {
  size: string;
  user: any;
};

export const Headers: React.FC<Interface> = ({ size, user }) => {
  const setWrite = useSetRecoilState(writeState);
  const [open, setOpen] = useRecoilState(menuOpenState);
  const toggleSwitch = () => {
    setOpen(!open);
    setWrite(false);
  };
  const date = new Date();
  const newNick = useRecoilValue(ChangeNickname);
  return (
    <Header>
      {size !== "Web" && (
        <Toggle size={size} open={open} onClick={toggleSwitch}>
          <ToggleBtn
            size={size}
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          ></ToggleBtn>
        </Toggle>
      )}
      <HeaderContent size={size}>
        <FlexBox gap={10}>
          <Text>
            {date.getMonth() + 1 < 10
              ? "0" + date.getMonth() + 1
              : date.getMonth() + 1}
            월
          </Text>
          <Text>
            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}일
          </Text>
        </FlexBox>
        <FlexBox>
          <Text>
            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}
          </Text>
          <Text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 0.1,
              repeatDelay: 0.3,
              repeatType: "reverse",
            }}
          >
            :
          </Text>
          <Text>
            {date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes()}
          </Text>
        </FlexBox>
        {size !== "Small" && (
          <Text style={{ color: "#FFE34F" }}>
            {newNick
              ? newNick
              : user?.displayName
              ? user?.displayName
              : user?.email}
          </Text>
        )}
        <Icon size={size}>
          {user?.photoURL ? (
            <Img src={user?.photoURL} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </Icon>
      </HeaderContent>
    </Header>
  );
};
