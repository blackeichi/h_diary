import styled from "styled-components";
import { faTrash, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColBox, FlexBox } from "../utils/Styled";
import { TText } from "./MessageBox";
import React from "react";
import { resizeState } from "../utils/atom";
import { useRecoilValue } from "recoil";

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
const CursorBox = styled.div`
  cursor: pointer;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Avatar = styled.img``;
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
              <Avatar src={user.photoURL} />
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
          <Img />
        )}
        <FlexBox
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{text.text}</Text>
          <CursorBox>
            <FontAwesomeIcon icon={faTrash} />
          </CursorBox>
        </FlexBox>
      </ColBox>
    </Wrapper>
  );
};
