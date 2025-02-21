"use client";
import { Session } from "next-auth";
import {
  ScheduleLeftBox,
  ScheduleRightBox,
  ScheduleWrapBox,
} from "./styles/css-in-js/ScheduleClientStyledComp";
import ScheduleLeft from "./ScheduleLeft";
import ScheduleRight from "./ScheduleRight";

interface IProps {
  session: Session;
}
export default function ScheduleClient({ session }: IProps) {
  return (
    <ScheduleWrapBox>
      {/* LEFT */}
      <ScheduleLeftBox>
        <ScheduleLeft />
      </ScheduleLeftBox>

      {/* RIGHT */}
      <ScheduleRightBox>
        <ScheduleRight />
      </ScheduleRightBox>
    </ScheduleWrapBox>
  );
}
