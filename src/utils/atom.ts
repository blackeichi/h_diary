import { atom } from "recoil";

export const resizeState = atom({
  key: "resize",
  default: "Web" || "Mid" || "Mobile" || "Small",
});

export const selectState = atom({
  key: "select",
  default: "diary" || "message" || "profile",
});
export const writeState = atom({
  key: "write",
  default: false,
});
export const menuOpenState = atom({
  key: "menu",
  default: false,
});
export const ChangeNickname = atom({
  key: "nickname",
  default: "",
});
