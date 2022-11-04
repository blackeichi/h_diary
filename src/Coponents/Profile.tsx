import {
  faCheck,
  faPen,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { menuOpenState } from "../utils/atom";
import { updateProfile } from "firebase/auth";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Anony = styled.div`
  width: 150px;
  height: 150px;
  font-size: 80px;
  background-color: gray;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
const Username = styled.div`
  background-color: white;
  color: ${(props) => props.theme.blackColr};
  border: 3px solid ${(props) => props.theme.blackColr};
  width: 200px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
`;
const EditInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  padding-right: 40px;
  box-sizing: border-box;
  background-color: transparent;
  color: ${(props) => props.theme.blackColr};
`;

const Icon = styled.button`
  position: absolute;
  right: -38px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.blackColr};
`;
const Text = styled.h1``;

type Interface = {
  user: any;
};

export const Profile: React.FC<Interface> = ({ user }) => {
  const setMenu = useSetRecoilState(menuOpenState);
  const [edit, setEdit] = useState(false);
  const [newDisplayName, setDisplayName] = useState(
    user.displayName === null ? "User" : user.displayName
  );
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (user.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName,
      });
    }
    setEdit(false);
  };
  return (
    <Box>
      <Anony>
        <FontAwesomeIcon icon={faUser} />
      </Anony>
      <Username>
        {edit ? (
          <>
            <form
              onSubmit={onSubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              <EditInput
                value={newDisplayName}
                autoFocus={true}
                onChange={onChange}
              />
              <Icon>
                <FontAwesomeIcon color="white" icon={faCheck} />
              </Icon>
            </form>
            <Icon
              onClick={() => {
                setEdit(false);
                setDisplayName(
                  user.displayName === null ? "User" : user.displayName
                );
              }}
              style={{ right: "5px", backgroundColor: "transparent" }}
            >
              <FontAwesomeIcon color="#32353F" icon={faXmark} />
            </Icon>
          </>
        ) : (
          <>
            <Text>{newDisplayName}</Text>
            <Icon
              onClick={() => {
                setEdit(true);
                setMenu(false);
              }}
            >
              <FontAwesomeIcon color="white" icon={faPen} />
            </Icon>
          </>
        )}
      </Username>
    </Box>
  );
};
