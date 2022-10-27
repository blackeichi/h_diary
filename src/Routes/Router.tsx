import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";
import { authService } from "../fbase";
import { Home } from "./Home";
import { Login } from "./Login";

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  });
  return (
    <HashRouter>
      {init ? (
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      ) : (
        <Box>
          <PacmanLoader color="#000000" size={25} />
        </Box>
      )}
    </HashRouter>
  );
};

export default Router;
