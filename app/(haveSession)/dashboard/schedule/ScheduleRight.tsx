"use client";

import useScheduleSelectedDate from "@/zustand/scheduleSelectedDate";
import { ScheduleRightCalendarBox } from "./styles/css-in-js/ScheduleRightStyledComp";
import moment from "moment";

export default function ScheduleRight() {
  // zustand에서 상태 및 setter 가져오기
  const { selectedDate, setSelectedDate } = useScheduleSelectedDate();

  return (
    <ScheduleRightCalendarBox>
      {`${moment(selectedDate).format("YYYY-MM-DD")}`}

      <p>개발중입니다</p>
    </ScheduleRightCalendarBox>
  );
}
