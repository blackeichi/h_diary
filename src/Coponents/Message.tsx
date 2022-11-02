import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import { collection, onSnapshot } from "firebase/firestore";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { dbService } from "../fbase";

type TText = {
  createdAt: number;
  id: string;
  text: string;
  user: { displayName: any; email: string };
};

export const Message = () => {
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
          <div key={tex.id}>{tex.text}</div>
        ))}
      </SwiperSlide>
    </Swiper>
  );
};