import styled from "styled-components";

/**
 * ScheduleClient 우측 내 캘린더 컨텐츠 내용을 감싸는 태그입니다.
 * @name ScheduleRightCalendarBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleRightCalendarBox = styled.div`
  width: 100%;
  height: auto;
  padding: 5px 10px;

  border: 1px solid var(--gray-400);
  border-radius: 10px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/**
 * ScheduleClient 우측 상단 내용을 감싸는 태그입니다.
 * @name ScheduleRightCalendarTopBox
 * @returns {StyledComponent} - styled.section
 */
const ScheduleRightCalendarTopBox = styled.section`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  header,
  time {
    font-size: 2.2rem;
  }

  header {
    font-weight: 500;
  }

  time {
    font-weight: 600;
    color: var(--mcolor);
  }
`;

/**
 * ScheduleClient 우측 하단 내용을 감싸는 태그입니다.
 * @name ScheduleRightCalendarBottomBox
 * @returns {StyledComponent} - styled.div
 */
const ScheduleRightCalendarBottomBox = styled.div`
  width: 100%;
`;
export {
  ScheduleRightCalendarBox,
  ScheduleRightCalendarTopBox,
  ScheduleRightCalendarBottomBox,
};
