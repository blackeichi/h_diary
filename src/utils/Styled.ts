import styled from "styled-components";

export const FlexBox = styled.div<{ Col?: boolean; gap?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.Col ? "column" : "row")};
  gap: ${(props) => (props.gap ? props.gap + "px" : "0")};
`;
export const ColBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
