import { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { dbService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { EachPlan } from "./EachPlan";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 80%;
  position: relative;
  padding-top: 30px;
  gap: 20px;
`;
const DotBox = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CalendarDot = styled.div`
  margin-top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f87171;
`;
const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Box = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.blackColr};
  padding: 15px 10px;
  box-sizing: border-box;
  color: white;
  border-radius: 15px;
`;
const Btn = styled.button`
  height: 80%;
  position: absolute;
  right: 10px;
  padding: 0 15px;
  border-radius: 15px;
  cursor: pointer;
`;
const SelDate = styled.h1``;
const PlanBox = styled.div`
  width: 100%;
  max-height: 100px;
  max-width: 400px;
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

export const CalendarPage = ({ user }) => {
  const [value, onChange] = useState(new Date());
  const { register, handleSubmit, resetField } = useForm();
  const onValid = async (data) => {
    setPlan([]);
    await addDoc(collection(dbService, "calendarMemo"), {
      text: data.text,
      date: new Date(value).toLocaleDateString("ko", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      userId: user?.uid,
    });
    resetField("text");
  };
  const [mark, setMark] = useState([]);
  const [plan, setPlan] = useState([]);
  const getDot = async () => {
    await onSnapshot(
      query(
        collection(dbService, "calendarMemo"),
        where("userId", "==", user.uid)
      ),
      (col) => {
        col.docs.map((dd) => {
          setMark((prev) => [...prev, dd.data().date]);
        });
      }
    );
  };
  const getDiary = async () => {
    await onSnapshot(
      query(
        collection(dbService, "calendarMemo"),
        where("userId", "==", user.uid),
        where(
          "date",
          "==",
          new Date(value).toLocaleDateString("ko", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        )
      ),
      (col) => {
        const newArr = col.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlan(newArr);
      }
    );
  };
  useEffect(() => {
    getDot();
  }, []);
  useEffect(() => {
    getDiary();
  }, [value]);

  return (
    <Container>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) =>
          //xx일 -> xx 으로 format 변경
          new Date(date).toLocaleDateString("en-us", {
            day: "2-digit",
          })
        }
        tileContent={({ date, view }) => {
          //
          const exist = mark.find(
            (oneDate) =>
              oneDate ===
              String(
                new Date(date).toLocaleDateString("ko", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              )
          );
          return (
            <>
              <DotBox>{exist && <CalendarDot />}</DotBox>
            </>
          );
        }}
      />

      <Form onSubmit={handleSubmit(onValid)}>
        <SelDate>
          {new Date(value).toLocaleDateString("ko", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </SelDate>
        <Box>
          <Input
            {...register("text", { required: "내용을 기입해주세요.😉" })}
            type="text"
            placeholder="스케쥴 추가하기!"
          ></Input>
          <Btn>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Btn>
        </Box>
      </Form>
      <PlanBox>
        {plan.map((data, index) => (
          <div key={index}>
            <EachPlan data={data} />
          </div>
        ))}
      </PlanBox>
    </Container>
  );
};
