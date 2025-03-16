"use client";

import useScheduleSelectedDate from "@/zustand/scheduleSelectedDate";
import { ScheduleLeftCalendarBox } from "./styles/css-in-js/ScheduleLeftStyledComp";
import CustomCalendar from "@/component/common/Calendar/CustomCalendar";
import { useEffect, useRef, useState } from "react";
import Button from "@/component/common/Button/Button";
import Dialog from "@/component/common/Dialog/Dialog";
import ScheduleManageDialog from "./Dialog/ScheduleManageDialog";
import { Session } from "next-auth";
import { useGetScheduleList } from "@/hooks/dashboard/schedule/useGetScheduleList";

interface IProps {
  session: Session;
}

export default function ScheduleLeft({ session }: IProps) {
  // zustand에서 상태 및 setter 가져오기
  const { selectedDate, setSelectedDate } = useScheduleSelectedDate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const { data, isLoading } = useGetScheduleList(selectedDate);

  useEffect(() => {
    console.log("useGetScheduleList ", data);
  }, [data]);
  return (
    <ScheduleLeftCalendarBox>
      {/* 캘린더 영역 */}
      <CustomCalendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        dateList={[]}
      />

      {/* 추가 버튼 */}
      <Button
        color={"blue"}
        title={"일정 추가"}
        id={"add_schedule"}
        size="lg"
        type="submit"
        onClick={(e) => {
          setDialogOpen(true);
        }}
        ref={ref}
      >
        일정 추가
      </Button>

      {/* 일정 추가에 해당하는 다이얼로그 */}
      {selectedDate && (
        <Dialog
          width="lg"
          open={dialogOpen}
          setOpen={setDialogOpen}
          title="일정 내용 저장"
          ref={ref}
          paperHidden={true}
        >
          <ScheduleManageDialog
            session={session}
            setOpen={setDialogOpen}
            selectedDate={selectedDate!}
            data={null}
          />
        </Dialog>
      )}
    </ScheduleLeftCalendarBox>
  );
}
