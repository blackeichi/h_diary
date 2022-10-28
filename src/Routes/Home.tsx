import React from "react";
import styled from "styled-components";
import { authService } from "../fbase";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const Container = styled.div``;

export const Home = () => {
  const LogOut = () => {
    authService.signOut();
  };
  return (
    <Box>
      <h1 onClick={LogOut}>home</h1>
      <Container></Container>
    </Box>
  );
};
