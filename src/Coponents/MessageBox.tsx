import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { FC, useEffect, useState } from "react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import { collection, onSnapshot } from "firebase/firestore";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { dbService } from "../fbase";

import { Message } from "./Message";

export type TText = {
  createdAt: number;
  id: string;
  attachmentUrl: string;
  text: string;
  user: { displayName: any; email: string; userId: string };
};
type Inter = {
  user: any;
};

export const MessageBox: React.FC<Inter> = ({ user }) => {
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
  console.log(user);
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
          <Message user={user} text={tex} />
        ))}
      </SwiperSlide>
    </Swiper>
  );
};
