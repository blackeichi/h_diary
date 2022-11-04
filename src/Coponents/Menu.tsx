import { motion } from "framer-motion";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { selectState, writeState } from "../utils/atom";

const Box = styled(motion.div)<{ size: string }>`
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
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

type Interface = {
  size: string;
  open: boolean;
};

export const Menu: React.FC<Interface> = ({ size, open }) => {
  const [select, setSelect] = useRecoilState(selectState);
  const setWrite = useSetRecoilState(writeState);
  return (
    <Box
      initial={size === "Web" ? { scaleX: 1 } : { scaleX: 0, x: -200 }}
      animate={
        size === "Web" ? {} : { scaleX: open ? 1 : 0, x: open ? 0 : -200 }
      }
      size={size}
      transition={{ type: "linear" }}
    >
      <MenuList
        onClick={() => {
          setSelect("message");
          setWrite(false);
        }}
        style={select === "message" ? { backgroundColor: "#f0fbff" } : {}}
      >
        {select === "message" ? "📭" : "📫"} Message
      </MenuList>
      <MenuList
        onClick={() => {
          setSelect("profile");
          setWrite(false);
        }}
        style={select === "profile" ? { backgroundColor: "#f0fbff" } : {}}
      >
        {select === "profile" ? "🤗" : "😎"} Profile
      </MenuList>
    </Box>
  );
};
