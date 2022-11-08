import {
  faPen,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
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
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const Box = styled.div<{ size: string }>`
  width: 100%;
  height: 100%;
  background-color: #f0fbff;
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => (props.size === "Small" ? "20px" : "40px")};
  box-sizing: border-box;
  justify-content: ${(props) =>
    props.size === "Small" ? "center" : "flex-start"};
  gap: ${(props) => (props.size === "Small" ? "20px" : "40px")};
  padding-bottom: 40px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: #e5e5e5;
    color: white;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.darkGray};
    border-radius: 10px;
  }
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
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
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
const TextBox = styled(FormBox)`
  position: relative;
  width: ${(props) => (props.size === "Small" ? "95%" : "550px")};
  height: ${(props) => (props.size === "Small" ? "90vh" : "95vh")};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 20px;
`;
const TextArea = styled.textarea`
  width: 90%;
  height: 90%;
`;
const Input = styled.input`
  width: 250px;
  height: 30px;
  font-size: 18px;
  font-family: "MonoplexKR-Regular";
`;
const Btn = styled.button`
  font-size: 15px;
  background-color: ${(props) => props.theme.blackColr};
  color: white;
  font-family: "MonoplexKR-Regular";
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  width: 150px;
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
const DiaryBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;
const DiaryTitle = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  font-family: "FlowerSalt";
  margin: 20px 0;
`;
const DiaryText = styled.h1`
  border-bottom: 1px solid red;
  text-decoration: underline 1px red;
  text-underline-offset: 10px;
  line-height: 30px;
  border-collapse: collapse;
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
  const [update, setUpdate] = useState(``);
  const [openUpdate, setOpenUpdate] = useState(false);
  //Diary
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
  //Diary Content
  const onSubmitText = async (event: any) => {
    event.preventDefault();
    if (clicked?.id) {
      await setDoc(doc(dbService, "diary", clicked?.id), { ...clicked, text });
    }
    setText(text);
    //setOpenMemo(false);
    setOpenUpdate(false);
  };
  const onChangeText = (event: any) => {
    const {
      target: { value },
    } = event;
    const newText = value.split("\n");
    setText(newText);
    setUpdate(value);
  };
  const getText = async (note: Tdiary) => {
    await onSnapshot(
      query(collection(dbService, "diary"), where("id", "==", note?.id)),
      (col) => {
        const newText: any = col.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setText(newText[0].text);
      }
    );
  };
  const onUpdate = () => {
    setUpdate(text.join(`\n`));
  };
  const closeTextBox = () => {
    setOpenMemo(false);
    setOpenUpdate(false);
    setText([]);
  };
  const deleteDiary = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까? 😮");
    if (ok && clicked) {
      window.confirm("삭제되었습니다. 👏");
      await deleteDoc(doc(dbService, "diary", clicked.id));
      setOpenMemo(false);
    }
  };
  return (
    <Box size={size}>
      <Add
        size={size}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Add>
      {diary.map((note: Tdiary) => (
        <Container
          whileHover={{ scale: 1.03 }}
          key={note.createdAt}
          size={size}
          onClick={() => {
            setOpenMemo(true);
            setClicked(note);
            getText(note);
          }}
        >
          <Note style={{ backgroundColor: note.color }} size={size}>
            <NoteTitle>{note.title}</NoteTitle>
          </Note>
          <Shadow size={size} />
        </Container>
      ))}

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
          <TextBox size={size}>
            <FontAwesomeIcon
              onClick={closeTextBox}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "15px",
                height: "15px",
                backgroundColor: "#32353F",
                color: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
              icon={faXmark}
            />
            <FontAwesomeIcon
              onClick={deleteDiary}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "40px",
                width: "15px",
                height: "15px",
                backgroundColor: "#32353F",
                color: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
              icon={faTrashCan}
            />
            {openUpdate ? (
              <Form onSubmit={onSubmitText}>
                <TextArea onChange={onChangeText} value={update} />
                <Btn>완료</Btn>
              </Form>
            ) : (
              <>
                <DiaryBox>
                  <DiaryTitle>{clicked?.title}</DiaryTitle>
                  {text.map((tex, index) => (
                    <DiaryText key={index}>{tex}</DiaryText>
                  ))}
                </DiaryBox>
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "10px",
                    right: "70px",
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#32353F",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                  onClick={() => {
                    setOpenUpdate(true);
                    onUpdate();
                  }}
                  icon={faPen}
                />
              </>
            )}
          </TextBox>
          <Overlay
            style={openMemo ? { display: "block" } : { display: "none" }}
            onClick={closeTextBox}
          />
        </CreateBox>
      )}
    </Box>
  );
};
