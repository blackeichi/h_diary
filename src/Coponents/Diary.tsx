import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dbService } from "../fbase";
import { resizeState } from "../utils/atom";

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0fbff;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
  gap: 40px;
`;
const Container = styled(motion.div)<{ size: string }>`
  cursor: pointer;
  position: relative;
  display: flex;
  width: ${(props) => (props.size === "Small" ? "160px" : "200px")};
  height: ${(props) => (props.size === "Small" ? "250px" : "300px")};
`;
const Note = styled(motion.div)<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "160px" : "200px")};
  height: ${(props) => (props.size === "Small" ? "250px" : "300px")};
  border-radius: 30px;
  border: 2px gray solid;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
`;
const NoteTitle = styled.div`
  font-size: 20px;
  font-family: "FlowerSalt";
  height: 30px;
  background-color: ${(props) => props.theme.blackColr};
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
  color: white;
`;
const Shadow = styled.div<{ size: string }>`
  position: absolute;
  background-color: white;
  width: ${(props) => (props.size === "Small" ? "160px" : "200px")};
  height: ${(props) => (props.size === "Small" ? "250px" : "300px")};
  right: -10px;
  top: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;
const Add = styled(motion.div)<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "160px" : "200px")};
  height: ${(props) => (props.size === "Small" ? "250px" : "300px")};
  background-color: white;
  border-radius: 20px;
  border: 2px gray dotted;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;
  margin-top: 5px;
`;
const CreateBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;
const FormBox = styled.div<{ size: string }>`
  width: ${(props) => (props.size === "Small" ? "100%" : "550px")};
  height: ${(props) => (props.size === "Small" ? "300px" : "350px")};
  background-color: white;
  z-index: 2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Input = styled.input`
  width: 250px;
  height: 30px;
  font-size: 18px;
  font-family: "MonoplexKR-Regular";
`;
const Btn = styled.button`
  font-size: 18px;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  font-family: "MonoplexKR-Regular";
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
`;
const ColorBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const Color = styled.div<{ col: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.col};
  cursor: pointer;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 1;
`;
type Inter = {
  user: any;
};
type Tdiary = {
  color: string;
  createdAt: number;
  title: string;
  text?: [];
  user: {
    displayName: string;
    userId: string;
  };
  id: string;
};
export const Diary: React.FC<Inter> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [openMemo, setOpenMemo] = useState(false);
  const size = useRecoilValue(resizeState);
  const colors = [
    "#f2f2f2",
    "#f95959",
    "#ff9a3c",
    "#FFE34F",
    "#97cba9",
    "#00bbf0",
    "#005792",
    "#9896f1",
    "#272343",
  ];
  const [color, setColor] = useState("#f2f2f2");
  const [title, setTitle] = useState("");
  const [clicked, setClicked] = useState<Tdiary>();
  const [text, setText] = useState([]);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!title) {
      window.alert("제목을 입력해주세요! 🤔");
      return;
    }
    await addDoc(collection(dbService, "diary"), {
      title,
      createdAt: Date.now(),
      color,
      userId: user?.uid,
      displayName: user?.displayName,
    });
    setTitle("");
    setOpen(false);
  };
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  const onSubmitText = async (event: any) => {
    event.preventDefault();
    if (clicked?.id) {
      await setDoc(doc(dbService, "diary", clicked?.id), { ...clicked, text });
    }
    setText([]);
    setOpenMemo(false);
  };
  const onChangeText = (event: any) => {
    const {
      target: { value },
    } = event;
    const newText = value.split("\n");
    setText(newText);
  };
  const [diary, setDiary] = useState([] as any);
  const getDiary = async () => {
    await onSnapshot(
      query(collection(dbService, "diary"), where("userId", "==", user?.uid)),
      (col) => {
        const newDiary = col.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDiary(newDiary);
      }
    );
  };
  useEffect(() => {
    getDiary();
  }, []);
  return (
    <Box>
      {diary.map((note: Tdiary) => (
        <Container
          whileHover={{ scale: 1.03 }}
          key={note.createdAt}
          size={size}
          onClick={() => {
            setOpenMemo(true);
            setClicked(note);
          }}
        >
          <Note style={{ backgroundColor: note.color }} size={size}>
            <NoteTitle>{note.title}</NoteTitle>
          </Note>
          <Shadow size={size} />
        </Container>
      ))}
      <Add
        size={size}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Add>
      {open && (
        <CreateBox>
          <FormBox size={size}>
            <Form onSubmit={onSubmit}>
              <Input
                placeholder="MEMO TITLE.."
                onChange={onChange}
                value={title}
                autoFocus={true}
              />
              <ColorBox>
                {colors.map((col, index) => (
                  <Color
                    col={col}
                    key={index}
                    onClick={() => {
                      setColor(col);
                    }}
                    style={
                      color === col
                        ? {
                            width: "35px",
                            height: "35px",
                            border: "1px gray dotted",
                          }
                        : {}
                    }
                  />
                ))}
              </ColorBox>
              <Btn>만들기</Btn>
            </Form>
          </FormBox>
          <Overlay
            style={open ? { display: "block" } : { display: "none" }}
            onClick={() => {
              setOpen(false);
              setTitle("");
            }}
          ></Overlay>
        </CreateBox>
      )}
      {openMemo && (
        <CreateBox>
          <FormBox size={size}>
            <Form onSubmit={onSubmitText}>
              <h1>
                {text.map((tex) => (
                  <h1>{tex}</h1>
                ))}
              </h1>
              <textarea
                onChange={onChangeText}
                value="안녕하세요. 
              저는"
              />
              <Btn>완료</Btn>
            </Form>
          </FormBox>
          <Overlay
            style={openMemo ? { display: "block" } : { display: "none" }}
            onClick={() => {
              setOpenMemo(false);
              setText([]);
            }}
          />
        </CreateBox>
      )}
    </Box>
  );
};
