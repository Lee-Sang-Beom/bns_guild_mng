"use client";

import useScheduleSelectedDate from "@/zustand/scheduleSelectedDate";
import { ScheduleRightCalendarBox } from "./styles/css-in-js/ScheduleRightStyledComp";
import moment from "moment";

export default function ScheduleRight() {
  // zustand에서 상태 및 setter 가져오기
  const { selectedDate, setSelectedDate } = useScheduleSelectedDate();

  return (
    <ScheduleRightCalendarBox>
      {Array.isArray(selectedDate)
        ? `${moment(selectedDate[0]).format("YYYY-MM-DD")} ~ ${moment(
            selectedDate[1]
          ).format("YYYY-MM-DD")}`
        : selectedDate
        ? moment(selectedDate).format("YYYY-MM-DD")
        : "날짜를 선택해주세요"}
    </ScheduleRightCalendarBox>
  );
}
