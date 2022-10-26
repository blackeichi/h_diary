import React from "react";
import { authService } from "../fbase";

export const Home = () => {
  const LogOut = () => {
    authService.signOut();
  };
  return <h1 onClick={LogOut}>home</h1>;
};
