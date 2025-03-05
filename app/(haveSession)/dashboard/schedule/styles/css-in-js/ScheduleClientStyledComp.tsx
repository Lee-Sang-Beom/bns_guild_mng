import styled from "styled-components";

/**
 * ScheduleClient 전체 내용을 감싸는 태그입니다.
 * @name ScheduleWrapBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleWrapBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 1320px) {
    flex-direction: column;
  }
`;

/**
 * ScheduleClient 좌측 내용을 감싸는 태그입니다.
 * @name ScheduleLeftBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleLeftBox = styled.div`
  width: calc(45% - 10px);
  height: auto;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

/**
 * ScheduleClient 우측 내용을 감싸는 태그입니다.
 * @name ScheduleRightBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleRightBox = styled.div`
  width: calc(55% - 10px);
  height: 100%;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

export { ScheduleWrapBox, ScheduleLeftBox, ScheduleRightBox };
