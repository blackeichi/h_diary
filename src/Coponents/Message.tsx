import styled from "styled-components";
import {
  faBan,
  faPen,
  faTrash,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColBox, FlexBox } from "../utils/Styled";
import { TText } from "./MessageBox";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid lightgray;
  position: relative;
`;
const Img = styled.img`
  min-width: 200px;
  width: 30vw;
  border-radius: 20px;
`;
const Text = styled.h1``;
const Menu = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
`;
const CursorBox = styled.div``;
const UserBox = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.img``;
const Anony = styled.div`
  width: 30px;
  height: 30px;
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
  console.log(date);
  return (
    <Wrapper key={text.id}>
      <ColBox>
        <FlexBox
          style={{ justifyContent: "space-between", alignItems: "center" }}
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

        {text.attachmentUrl && <Img src={text.attachmentUrl} />}
        <Text>{text.text}</Text>
      </ColBox>
      {text.user.userId === user.uid && (
        <Menu>
          <CursorBox>
            <FontAwesomeIcon icon={faTrash} />
          </CursorBox>
          <CursorBox>
            <FontAwesomeIcon icon={faBan} />
          </CursorBox>
          <CursorBox>
            <FontAwesomeIcon icon={faPen} />
          </CursorBox>
        </Menu>
      )}
    </Wrapper>
  );
};
