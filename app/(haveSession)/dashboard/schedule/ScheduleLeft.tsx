"use client";

import CustomCalendar, {
  SelectedDate,
} from "@/component/common/Calendar/CustomCalendar";
import { ScheduleLeftCalendarBox } from "./styles/css-in-js/ScheduleLeftStyledComp";
import { useEffect, useState } from "react";

export default function ScheduleLeft() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  useEffect(() => {
    console.log("sel ", selectedDate);
  }, [selectedDate]);
  return (
    <ScheduleLeftCalendarBox>
      <CustomCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
    </ScheduleLeftCalendarBox>
  );
}
