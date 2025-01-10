"use client";

import { Session } from "next-auth";
import ms from "./CashShare.module.scss";
import CashShareTop from "./CashShareTop";

interface IProps {
  session: Session;
}
export default function CashShareClient({ session }: IProps) {
  console.log("session is ", session);
  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <CashShareTop session={session} />

      {/* BOTTOM */}
    </div>
  );
}
