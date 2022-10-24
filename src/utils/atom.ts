import { atom } from "recoil";

export const resizeState = atom({
  key: "resize",
  default: "Web" || "Mid" || "Mobile" || "Small",
});
