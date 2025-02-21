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
`;

/**
 * ScheduleClient 좌측 내용을 감싸는 태그입니다.
 * @name ScheduleLeftBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleLeftBox = styled.div`
  flex-basis: calc(70% - 10px);
  height: auto;
`;

/**
 * ScheduleClient 우측 내용을 감싸는 태그입니다.
 * @name ScheduleRightBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleRightBox = styled.div`
  flex-basis: calc(30% - 10px);
  height: auto;
`;

export { ScheduleWrapBox, ScheduleLeftBox, ScheduleRightBox };
