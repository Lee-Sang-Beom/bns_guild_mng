import styled from "styled-components";

/**
 * ScheduleClient 좌측 내 캘린더를 감싸는 태그입니다.
 * @name ScheduleLeftCalendarBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleLeftCalendarBox = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export { ScheduleLeftCalendarBox };
