import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
