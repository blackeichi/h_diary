import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { authService } from "../fbase";
import { menuOpenState, resizeState, selectState } from "../utils/atom";
import { MessageBox } from "../Coponents/MessageBox";
import { SendInput } from "../Coponents/SendInput";
import { Menu } from "../Coponents/Menu";
import { Headers } from "../Coponents/Headers";
import { Profile } from "../Coponents/Profile";
import { Diary } from "../Coponents/Diary";
import { CalendarPage } from "../Coponents/CalendarPage";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.grayBg};
`;
const Container = styled.div<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "95%" : "90%")};
  height: ${(props) => (props.size === "Small" ? "100%" : "90%")};
  max-width: 1400px;
  max-height: 800px;
  background-color: white;
  border-radius: 25px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: "MonoplexKR-Regular";
`;

export const Home = () => {
  const size = useRecoilValue(resizeState);
  const [open, setOpen] = useRecoilState(menuOpenState);
  const user = authService.currentUser;
  const select = useRecoilValue(selectState);
  return (
    <Box>
      <Container size={size}>
        <Headers size={size} user={user} />
        <ContentBox>
          {(size === "Web" || open) && <Menu size={size} open={open} />}
          <Content onClick={() => setOpen(false)}>
            {select === "message" && (
              <>
                <MessageBox user={user} />

                <SendInput size={size} user={user} />
              </>
            )}
            {select === "profile" && <Profile user={user} />}
            {select === "diary" && <Diary user={user} />}
            {select === "calendar" && <CalendarPage user={user} />}
          </Content>
        </ContentBox>
      </Container>
    </Box>
  );
};
