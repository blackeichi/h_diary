import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import AppRouter from "./Routes/Router";
import { resizeState } from "./utils/atom";
import { Color } from "./utils/color";

function App() {
  const [screen, setScreen] = useState(window.outerWidth);
  const setLarge = useSetRecoilState(resizeState);
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (screen >= 980) {
      setLarge("Web");
    } else if (screen <= 700 && screen > 560) {
      setLarge("Mobile");
    } else if (screen <= 560) {
      setLarge("Small");
    } else {
      setLarge("Mid");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <ThemeProvider theme={Color}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
