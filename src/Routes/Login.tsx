import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { resizeState } from "../utils/atom";
import { InputForm } from "../Coponents/InputForm";

const Box = styled.div<{ size: string }>`
  background-color: ${(props) => props.theme.grayBg};
  width: 100vw;
  height: 100vh;
  padding: ${(props) =>
    props.size === "Web"
      ? "100px"
      : props.size === "Mid"
      ? "80px"
      : props.size === "Mobile"
      ? "60px"
      : "10px"};
  box-sizing: border-box;
  font-family: "MonoplexKR-Regular";
`;
const Face = styled.div<{ size: string }>`
  width: ${(props) =>
    props.size === "Web" ? "100px" : props.size === "Mid" ? "80px" : "60px"};
  height: ${(props) =>
    props.size === "Web" ? "100px" : props.size === "Mid" ? "80px" : "60px"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: ${(props) =>
      props.size === "Web" ? "14px" : props.size === "Mid" ? "12px" : "10px"}
    solid ${(props) => props.theme.blackColr};
`;
const Eye = styled(motion.div)<{ size: string }>`
  width: ${(props) =>
    props.size === "Web" ? "14px" : props.size === "Mid" ? "12px" : "10px"};
  height: ${(props) =>
    props.size === "Web" ? "14px" : props.size === "Mid" ? "12px" : "10px"};
  border-radius: 50%;
  background-color: ${(props) => props.theme.blackColr};
`;
const ClickBox = styled(motion.div)<{ size: string }>`
  position: fixed;
  bottom: ${(props) => (props.size === "Small" ? "10px" : "40px")};
  right: ${(props) => (props.size === "Small" ? "10px" : "40px")};
  width: ${(props) =>
    props.size === "Web" ? "300px" : props.size === "Mid" ? "250px" : "200px"};
  height: ${(props) =>
    props.size === "Web" ? "120px" : props.size === "Mid" ? "100px" : "80px"};
  border-radius: 100px;
  background-color: ${(props) => props.theme.blackColr};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.h1<{ size: string }>`
  color: gray;
  background-color: transparent;
  font-family: "MonoplexKR-Regular";
  font-size: ${(props) =>
    props.size === "Web" ? "24px" : props.size === "Mid" ? "20px" : "16px"};
  margin-left: 10%;
`;
const Wrapper = styled.div``;
const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Title = styled.h1<{ size: string }>`
  font-size: ${(props) =>
    props.size === "Web" ? "70px" : props.size === "Mid" ? "60px" : "40px"};
  font-weight: bold;
`;
const ColBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;
const ChatBox = styled(motion.div)<{ size: string }>`
  width: ${(props) =>
    props.size === "Web" ? "300px" : props.size === "Mid" ? "250px" : "200px"};
  height: ${(props) =>
    props.size === "Web" ? "120px" : props.size === "Mid" ? "100px" : "80px"};
  background-color: ${(props) => props.theme.blueColr};
  border-radius: 100px;
  border-top-left-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) =>
    props.size === "Web" ? "100px" : props.size === "Mid" ? "80px" : "60px"};
  font-size: ${(props) =>
    props.size === "Web" ? "24px" : props.size === "Mid" ? "20px" : "16px"};
  font-weight: bold;
  color: white;
`;
const IconBox = styled.div<{ size: string }>`
  background-color: ${(props) => props.theme.blueColr};
  font-size: ${(props) =>
    props.size === "Web" ? "30px" : props.size === "Mid" ? "26px" : "24px"};
  padding: ${(props) =>
    props.size === "Web" ? "20px" : props.size === "Mid" ? "15px" : "10px"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${(props) => (props.size === "Small" ? "10px" : "15px")};
`;
const Container = styled.div`
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
`;
const LoginBox = styled.div<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "90%" : "500px")};
  height: ${(props) => (props.size === "Small" ? "350px" : "500px")};
  position: absolute;
  background-color: white;
  border-radius: 40px;
`;
//------------------------------------------------------------
const eyeMove = {
  start: {
    scale: 0,
    height: "0px",
  },
  anime: (size: string) => {
    return {
      scale: 1,
      height: size === "Web" ? "14px" : size === "Mid" ? "12px" : "10px",
    };
  },
};

export const Login = () => {
  const size = useRecoilValue(resizeState);
  const [open, setOpen] = useState(false);
  return (
    <Box size={size}>
      <Wrapper>
        <RowBox>
          <Face size={size}>
            <Eye
              size={size}
              custom={size}
              variants={eyeMove}
              initial="start"
              animate="anime"
              exit="start"
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <Eye
              size={size}
              custom={size}
              variants={eyeMove}
              initial="start"
              animate="anime"
              exit="start"
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
          </Face>
          <Title size={size}>MY DIARY</Title>
        </RowBox>
        <ColBox>
          <ChatBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            size={size}
          >
            안녕, 친구!👋
          </ChatBox>
          <ChatBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            size={size}
          >
            넌 누구니?
          </ChatBox>
        </ColBox>
      </Wrapper>
      <ClickBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
        onClick={() => setOpen(true)}
        size={size}
      >
        <Text size={size}>나는...</Text>
        <IconBox size={size}>
          <FontAwesomeIcon color={"white"} icon={faPaperPlane} />
        </IconBox>
      </ClickBox>
      {open && (
        <Container>
          <LoginBox size={size}>
            <InputForm />
          </LoginBox>
          <Overlay onClick={() => setOpen(false)}></Overlay>
        </Container>
      )}
    </Box>
  );
};
