import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { FC, useEffect, useState } from "react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import { collection, onSnapshot } from "firebase/firestore";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { dbService } from "../fbase";
import styled from "styled-components";
import { faBan, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div``;
const Img = styled.img``;
const Text = styled.h1``;
const Menu = styled.div``;
const CursorBox = styled.div``;
type TText = {
  createdAt: number;
  id: string;
  attachmentUrl: string;
  text: string;
  user: { displayName: any; email: string; userId: string };
};
type Inter = {
  user: any;
};

export const Message: React.FC<Inter> = ({ user }) => {
  const [text, setText] = useState([] as any);
  const getText = async () => {
    const dbText = await onSnapshot(collection(dbService, "memo"), (col) => {
      const newText = col.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setText(newText);
    });
  };
  useEffect(() => {
    getText();
  }, []);
  console.log(text);
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={true}
      scrollbar={true}
      mousewheel={true}
      modules={[FreeMode, Scrollbar, Mousewheel]}
    >
      <SwiperSlide>
        {text.map((tex: TText) => (
          <Wrapper key={tex.id}>
            <Img src={tex.attachmentUrl} />
            <Text>{tex.text}</Text>
            {tex.user.userId === user.uid && (
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
        ))}
      </SwiperSlide>
    </Swiper>
  );
};
