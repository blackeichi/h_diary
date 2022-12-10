import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../fbase";

const Plan = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  margin-bottom: 5px;
`;
const PlanText = styled.h1``;
const PlanBtn = styled.div`
  cursor: pointer;
  display: flex;
  gap: 5px;
`;

export const EachPlan = ({ data }: any) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까? 😮");
    if (ok) {
      window.confirm("삭제되었습니다. 👏");
      await deleteDoc(doc(dbService, "calendarMemo", data.id));
    }
  };
  return (
    <Plan>
      <PlanText>{data.text}</PlanText>
      <PlanBtn onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faTrashCan} />
      </PlanBtn>
    </Plan>
  );
};
