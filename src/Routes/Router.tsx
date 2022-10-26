import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { authService } from "../fbase";
import { Home } from "./Home";
import { Login } from "./Login";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });
  return (
    <HashRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default Router;
