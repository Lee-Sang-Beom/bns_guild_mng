// ScheduleManageDialogStyledComp.tsx
import styled from "styled-components";

export const Wrap = styled.section`
  width: 100%;
  max-height: 700px;
  overflow-x: hidden;
  overflow-y: scroll;

  * {
    box-sizing: border-box;
  }
`;

export const Section = styled.article`
  padding: 10px;
  background-color: var(--mbackgroundColor);
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const InputBox = styled.fieldset`
  width: 100%;
  border: none;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: inline-block;
  font-weight: 500;
  font-size: var(--fs-18);
  margin-bottom: 5px;

  .essential {
    color: red;
    margin-left: 4px;
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
