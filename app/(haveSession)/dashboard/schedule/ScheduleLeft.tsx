"use client";

import useScheduleSelectedDate from "@/zustand/scheduleSelectedDate";
import { ScheduleLeftCalendarBox } from "./styles/css-in-js/ScheduleLeftStyledComp";
import CustomCalendar from "@/component/common/Calendar/CustomCalendar";
import { useEffect, useState } from "react";
import Button from "@/component/common/Button/Button";

export default function ScheduleLeft() {
  // zustand에서 상태 및 setter 가져오기
  const { selectedDate, setSelectedDate } = useScheduleSelectedDate();

  return (
    <ScheduleLeftCalendarBox>
      <CustomCalendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        dateList={[]}
      />

      <Button
        color={"blue"}
        title={"일정 추가"}
        id={"add_schedule"}
        size="lg"
        type="submit"
        onClick={(e) => {}}
      >
        일정 추가
      </Button>
    </ScheduleLeftCalendarBox>
  );
}
