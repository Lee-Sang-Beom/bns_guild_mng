"use client";

import useScheduleSelectedDate from "@/zustand/scheduleSelectedDate";
import {
  ScheduleRightCalendarBottomBox,
  ScheduleRightCalendarBox,
  ScheduleRightCalendarTopBox,
} from "./styles/css-in-js/ScheduleRightStyledComp";
import moment from "moment";

export default function ScheduleRight() {
  // zustand에서 상태 및 setter 가져오기
  const { selectedDate, setSelectedDate } = useScheduleSelectedDate();

  return (
    <ScheduleRightCalendarBox>
      {/* TOP: 선택일자 출력 */}
      <ScheduleRightCalendarTopBox>
        <header>선택일자</header>
        <time dateTime={moment(selectedDate).format("YYYY-MM-DD")}>
          {moment(selectedDate).format("YYYY-MM-DD")}
        </time>
      </ScheduleRightCalendarTopBox>

      {/* BOTTOM: 선택일자에 해당하는 일정 출력 */}
      <ScheduleRightCalendarBottomBox></ScheduleRightCalendarBottomBox>
    </ScheduleRightCalendarBox>
  );
}
