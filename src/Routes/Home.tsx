import {
  faComment,
  faImage,
  faPlus,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authService } from "../fbase";
import { resizeState } from "../utils/atom";
import { FlexBox } from "../utils/Styled";
import { MessageBox } from "../Coponents/MessageBox";
import { SendInput } from "../Coponents/SendInput";

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
  position: ${(props) => (props.size === "Web" ? "static" : "absolute")};
  background-color: white;
  z-index: 3;
  font-family: "MonoplexKR-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  gap: 15px;
`;
const MenuList = styled.h1`
  padding: 10px;
  border-radius: 20px;
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

export const Home = () => {
  const LogOut = () => {
    authService.signOut();
  };
  const size = useRecoilValue(resizeState);
  const [open, setOpen] = useState(false);
  const toggleSwitch = () => setOpen(!open);
  const user = authService.currentUser;
  const date = new Date();
  const [select, setSelect] = useState("message");
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
              <MenuList
                onClick={() => setSelect("message")}
                style={
                  select === "message" ? { backgroundColor: "#f0fbff" } : {}
                }
              >
                {select === "message" ? "📭" : "📫"} Message
              </MenuList>
              <MenuList
                onClick={() => setSelect("profile")}
                style={
                  select === "profile" ? { backgroundColor: "#f0fbff" } : {}
                }
              >
                {select === "profile" ? "🤗" : "😎"} Profile
              </MenuList>
            </Menu>
          )}
          <Content>
            <MessageBox user={user} />
          </Content>
          <SendInput size={size} user={user} />
        </ContentBox>
      </Container>
    </Box>
  );
};
