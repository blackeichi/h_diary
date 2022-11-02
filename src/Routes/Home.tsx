import {
  faPlus,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authService, dbService } from "../fbase";
import { resizeState } from "../utils/atom";
import { FlexBox } from "../utils/Styled";
import { collection, addDoc } from "firebase/firestore";
import { Message } from "../Coponents/Message";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.grayBg};
`;
const Container = styled.div<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "95%" : "90%")};
  height: ${(props) => (props.size === "Small" ? "95vh" : "80vh")};
  max-width: 1400px;
  max-height: 800px;
  background-color: white;
  border-radius: 25px;
  overflow: hidden;
`;
const Header = styled.div`
  width: 100%;
  height: 10%;
  min-height: 80px;
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
const Icon = styled.div<{ size: string }>`
  color: ${(props) => props.theme.blueColr};
  background-color: white;
  padding: ${(props) => (props.size === "Mid" ? "1.5vw" : "10px")};
  border-radius: 50%;
  font-size: ${(props) => (props.size === "Small" ? "15px" : "20px")};
  cursor: pointer;
`;
const HeaderContent = styled.div`
  display: flex;
  color: white;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  font-size: 18px;
  font-family: "MonoplexKR-Regular";
`;

const Text = styled(motion.h1)``;
const ContentBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  position: relative;
  overflow: hidden;
`;
const Menu = styled(motion.div)<{ size: string }>`
  width: 250px;
  height: 100%;
  border-right: 1px solid lightgray;
  position: absolute;
  background-color: ${(props) => props.theme.lightBlue};
  z-index: 3;
`;
const MenuList = styled.h1`
  cursor: pointer;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: "MonoplexKR-Regular";
`;
const SendBox = styled.div`
  z-index: 2;
`;
const TextForm = styled(motion.form)<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "250px" : "400px")};
  box-sizing: border-box;
  position: relative;
`;
const InputText = styled.input`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  font-family: "MonoplexKR-Regular";
  font-weight: bold;
  border-radius: 10px;
`;
const TextBtn = styled.button`
  height: 50px;
  position: absolute;
  background-color: transparent;
  border: none;
  right: 20px;
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
export const Home = () => {
  const LogOut = () => {
    authService.signOut();
  };
  const size = useRecoilValue(resizeState);
  const [open, setOpen] = useState(false);
  const toggleSwitch = () => setOpen(!open);
  console.log(size);
  const user = authService.currentUser;
  const date = new Date();
  const [write, setWrite] = useState(false);
  const openWrite = () => setWrite(!write);
  const [text, setText] = useState("");
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    await addDoc(collection(dbService, "memo"), {
      text,
      createdAt: Date.now(),
      user: {
        userId: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
      },
    });
    setText("");
  };
  console.log(user);
  return (
    <Box>
      <Container size={size}>
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
          <HeaderContent>
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
            {size !== "Small" && <Text>{user?.email}</Text>}
            <Icon size={size} onClick={LogOut}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Icon>
          </HeaderContent>
        </Header>
        <ContentBox>
          {(size === "Web" || open) && (
            <Menu
              initial={size === "Web" ? { scaleX: 1 } : { scaleX: 0, x: -200 }}
              animate={
                size === "Web"
                  ? {}
                  : { scaleX: open ? 1 : 0, x: open ? 0 : -200 }
              }
              size={size}
              transition={{ type: "linear" }}
            >
              <MenuList>메모장</MenuList>
            </Menu>
          )}
          <Content>
            <SendBox
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                right: 0,
                bottom: size === "Small" ? "5%" : "13%",
              }}
            >
              <TextForm
                onSubmit={onSubmit}
                onChange={onChange}
                size={size}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: write ? 1 : 0, opacity: write ? 1 : 0 }}
                onBlur={() => {
                  setWrite(false);
                }}
              >
                <InputText value={text} />
                <TextBtn>보내기</TextBtn>
              </TextForm>
              <Add
                whileHover={{ scale: 1.1 }}
                initial={{ x: 0 }}
                animate={{ x: write ? (size === "Small" ? 150 : 225) : 0 }}
                onClick={openWrite}
              >
                <FontAwesomeIcon icon={write ? faXmark : faPlus} />
              </Add>
            </SendBox>
            <Message />
          </Content>
        </ContentBox>
      </Container>
    </Box>
  );
};
