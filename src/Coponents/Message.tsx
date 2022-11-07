import styled from "styled-components";
import { faTrash, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColBox, FlexBox } from "../utils/Styled";
import { TText } from "./MessageBox";
import React from "react";
import { resizeState } from "../utils/atom";
import { useRecoilValue } from "recoil";
import { dbService, storageService } from "../fbase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid lightgray;
  position: relative;
  padding-bottom: 30px;
  margin-top: 10px;
  height: 100%;
  box-sizing: border-box;
`;
const Img = styled.img<{ size?: string }>`
  min-height: 250px;
  height: 25vw;
  max-height: 55vh;
  max-width: 100%;
  border-radius: 20px;
`;
const Text = styled.h1``;
const CursorBox = styled(motion.div)`
  cursor: pointer;
  color: ${(props) => props.theme.blackColr};
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const Anony = styled.div`
  width: 30px;
  height: 30px;
  font-size: 15px;
  background-color: gray;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
const Username = styled.h1`
  font-size: 12px;
`;

type Interface = {
  text: TText;
  user: any;
};

export const Message: React.FC<Interface> = ({ text, user }) => {
  const date = new Date(text.createdAt);
  const size = useRecoilValue(resizeState);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까? 😮");
    if (ok) {
      window.confirm("삭제되었습니다. 👏");
      await deleteDoc(doc(dbService, "memo", text.id));
      await deleteObject(ref(storageService, text.attachmentUrl));
    }
  };
  return (
    <Wrapper key={text.id}>
      <ColBox
        style={{
          gap: size !== "Web" ? "0px" : "20px",
          width: "100%",
          maxWidth: "600px",
          alignItems: "center",
          justifyContent: size !== "Web" ? "space-between" : "center",
        }}
      >
        <FlexBox
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <UserBox>
            {user.photoURL ? (
              <Anony>
                <Avatar src={user.photoURL} />
              </Anony>
            ) : (
              <Anony>
                <FontAwesomeIcon icon={faUserAlt} />
              </Anony>
            )}
            <Username>
              {user.displayName ? user.displayName : user.email}
            </Username>
          </UserBox>
          <Username>
            {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}
          </Username>
        </FlexBox>
        {text.attachmentUrl ? (
          <Img size={size} src={text.attachmentUrl} />
        ) : (
          <Img
            size={size}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
            }
          />
        )}
        <FlexBox
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FlexBox style={{ alignItems: "center" }}>
            <Username style={{ marginRight: "5px", fontWeight: "bold" }}>
              {text.user.displayName ? text.user.displayName : text.user.email}
            </Username>
            <Text>{text.text}</Text>
          </FlexBox>
          <CursorBox whileHover={{ scale: 1.2 }} onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </CursorBox>
        </FlexBox>
      </ColBox>
    </Wrapper>
  );
};
