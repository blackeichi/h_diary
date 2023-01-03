import {
  faCheck,
  faImage,
  faPen,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ChangeNickname, menuOpenState } from "../utils/atom";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { authService, storageService } from "../fbase";
import { uuidv4 } from "@firebase/util";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 30px;
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
  position: relative;
`;
const Username = styled(motion.div)`
  background-color: white;
  color: ${(props) => props.theme.blackColr};
  border: 3px solid ${(props) => props.theme.blackColr};
  width: 220px;
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

const Icon = styled(motion.button)`
  position: absolute;
  right: -42px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.blackColr};
`;
const Label = styled(motion.label)`
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.blueColr};
  right: 20px;
  top: 5px;
  padding: 5px;
  font-size: 15px;
`;
const Text = styled.h1``;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const Confirm = styled(motion.button)`
  position: absolute;
  font-size: 15px;
  color: ${(props) => props.theme.blackColr};
  background-color: white;
  border: 3px solid ${(props) => props.theme.blackColr};
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  bottom: 10px;
  font-weight: bold;
  box-sizing: border-box;
`;

type Interface = {
  user: any;
};

export const Profile: React.FC<Interface> = ({ user }) => {
  const setMenu = useSetRecoilState(menuOpenState);
  const [edit, setEdit] = useState(false);
  const [newDisplayName, setDisplayName] = useState(
    user.displayName === null ? "User" : user.displayName
  );
  const setNick = useSetRecoilState(ChangeNickname);
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
    setNick(newDisplayName);
  };
  const onChangePhoto = async (event: any) => {
    event.preventDefault();
    setMenu(false);
    const fileRef = ref(storageService, `${user?.uid}/${uuidv4()}`);
    let attachmentUrl = "";
    if (attachment) {
      await uploadString(fileRef, attachment, "data_url").then((snapshot) => {
        console.log("Uploading!!");
      });
      attachmentUrl = await getDownloadURL(fileRef);
    }
    await updateProfile(user, {
      photoURL: attachmentUrl,
    });
    setAttachment("");
  };
  const [attachment, setAttachment] = useState("");
  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent as any;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  return (
    <Box>
      <Anony>
        <form>
          <Label whileHover={{ scale: 1.1 }} htmlFor="photo">
            <FontAwesomeIcon color="white" icon={faImage} />
          </Label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
        </form>
        {attachment ? (
          <>
            <Img src={attachment} />
            <Confirm onClick={onChangePhoto} whileHover={{ scale: 1.1 }}>
              저장
            </Confirm>
          </>
        ) : user?.photoURL ? (
          <Img src={user?.photoURL} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
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
              <Icon whileHover={{ scale: 1.1 }}>
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
              whileHover={{ scale: 1.1 }}
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
      <Username
        whileHover={{ scale: 1.05 }}
        style={{
          backgroundColor: "#32353F",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => authService.signOut()}
      >
        <Text>로그아웃</Text>
      </Username>
    </Box>
  );
};
