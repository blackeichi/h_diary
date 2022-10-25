import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.blackColr};
  color: white;
`;

export const InputForm = () => {
  return (
    <Box>
      <Form>
        <Input></Input>
        <Input></Input>
      </Form>
    </Box>
  );
};
