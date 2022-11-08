import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { dbService } from "../fbase";

import { Message } from "./Message";
import { useSetRecoilState } from "recoil";
import { writeState } from "../utils/atom";

export type TText = {
  createdAt: number;
  id: string;
  attachmentUrl: string;
  text: string;
  user: { displayName: any; email: string; userId: string; photoURL: string };
};
type Inter = {
  user: any;
};

export const MessageBox: React.FC<Inter> = ({ user }) => {
  const setWrite = useSetRecoilState(writeState);
  const [text, setText] = useState([] as any);
  const getText = async () => {
    await onSnapshot(
      query(collection(dbService, "memo"), orderBy("createdAt", "desc")),
      (col) => {
        const newText = col.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setText(newText);
      }
    );
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <Swiper
      direction={"vertical"}
      scrollbar={{
        hide: true,
      }}
      mousewheel={true}
      freeMode={true}
      modules={[Scrollbar, Mousewheel, FreeMode]}
      onClick={() => setWrite(false)}
    >
      {text.map((tex: TText) => (
        <SwiperSlide key={tex.id}>
          <Message user={user} text={tex} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
