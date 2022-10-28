import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authService } from "../fbase";
import { resizeState } from "../utils/atom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.grayBg};
`;
const Container = styled.div`
  width: 90%;
  height: 80vh;
  max-width: 1400px;
  max-height: 800px;
  background-color: white;
  border-radius: 25px;
`;
const Header = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.blueColr};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
`;
const Toggle = styled.div<{ open: boolean }>`
  background-color: ${(props) => props.theme.blackColr};
  width: 10vw;
  height: 6vw;
  max-width: 100px;
  max-height: 60px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  justify-content: ${(props) => (props.open ? "flex-end" : "flex-start")};
  box-sizing: border-box;
`;
const ToggleBtn = styled(motion.div)`
  background-color: white;
  border-radius: 50%;
  max-width: 40px;
  max-height: 40px;
  width: 4vw;
  height: 4vw;
`;
const Content = styled.div`
  width: 100%;
  height: 90%;
`;
const Menu = styled.div<{ size: string }>`
  width: 250px;
  height: 100%;
  border-right: 1px solid lightgray;
`;
export const Home = () => {
  const LogOut = () => {
    authService.signOut();
  };
  const size = useRecoilValue(resizeState);
  const [open, setOpen] = useState(false);
  const toggleSwitch = () => setOpen(!open);
  console.log(size);
  return (
    <Box>
      <Container>
        <Header>
          {size !== "Web" && (
            <Toggle open={open} onClick={toggleSwitch}>
              <ToggleBtn
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              ></ToggleBtn>
            </Toggle>
          )}
          <FontAwesomeIcon icon={faRightFromBracket} onClick={LogOut} />
        </Header>
        <Content>
          {(size === "Web" || open) && <Menu size={size}></Menu>}
        </Content>
      </Container>
    </Box>
  );
};
