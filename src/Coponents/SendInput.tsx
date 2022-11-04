import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { dbService, storageService } from "../fbase";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const SendBox = styled.div`
  z-index: 2;
`;
const TextForm = styled(motion.form)<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "200px" : "400px")};
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
const InputText = styled.input`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  font-family: "MonoplexKR-Regular";
  font-weight: bold;
  border-radius: 10px;
  padding-left: 45px;
`;
const TextBtn = styled.button<{ size: string }>`
  height: 50px;
  position: absolute;
  background-color: transparent;
  border: none;
  right: ${(props) => (props.size === "Small" ? "5px" : "20px")};
  color: white;
  font-family: "MonoplexKR-Regular";
  cursor: pointer;
  font-weight: bold;
`;
const Add = styled(motion.h1)<{ size: string }>`
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
`;

type Inter = {
  user: any;
  size: string;
};

export const SendInput: React.FC<Inter> = ({ size, user }) => {
  const [write, setWrite] = useState(false);
  const openWrite = () => setWrite(!write);
  const [text, setText] = useState("");
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setText(value);
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
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const fileRef = ref(storageService, `${user?.uid}/${uuidv4()}`);
    let attachmentUrl = "";
    if (attachment) {
      await uploadString(fileRef, attachment, "data_url").then((snapshot) => {
        console.log("Uploading!!");
      });
      attachmentUrl = await getDownloadURL(fileRef);
    }
    await addDoc(collection(dbService, "memo"), {
      text,
      createdAt: Date.now(),
      attachmentUrl,
      user: {
        userId: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
      },
    });
    setText("");
    setAttachment("");
    setWrite(false);
  };
  return (
    <SendBox
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        right: 0,
        bottom: size === "Small" ? "2%" : "6.5%",
      }}
    >
      <TextForm
        onSubmit={onSubmit}
        size={size}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: write ? 1 : 0, opacity: write ? 1 : 0 }}
      >
        <label
          htmlFor="photo"
          style={{
            position: "absolute",
            left: "3px",
            cursor: "pointer",
          }}
        >
          {attachment ? (
            <Img src={attachment} />
          ) : (
            <FontAwesomeIcon size="2xl" color={"white"} icon={faImage} />
          )}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <InputText onChange={onChange} value={text} />
        <TextBtn size={size}>보내기</TextBtn>
      </TextForm>
      <Add
        whileHover={{ scale: 1.1 }}
        initial={{ x: 0 }}
        animate={{ x: write ? (size === "Small" ? 125 : 225) : 0 }}
        onClick={openWrite}
        size={size}
      >
        <FontAwesomeIcon icon={write ? faXmark : faPlus} />
      </Add>
    </SendBox>
  );
};
