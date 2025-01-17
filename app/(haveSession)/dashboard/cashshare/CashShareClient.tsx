"use client";

import { Session } from "next-auth";
import ms from "./CashShare.module.scss";
import CashShareTop from "./CashShareTop";
import CashShareBottom from "./CashShareBottom";
import { CashshareRequest } from "@/types/haveSession/dashboard/cashshare/request";
import { TablePageResponse } from "@/types/common/commonType";
import CashShareMiddle from "./CashShareMiddle";
import { CashshareResponse } from "@/types/haveSession/dashboard/cashshare/response";

interface IProps {
  session: Session;
  queryInstance: CashshareRequest;
  tableResponse: TablePageResponse<CashshareResponse[]>;
}
export default function CashShareClient({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <CashShareTop session={session} />

      {/* MIDDLE */}
      <CashShareMiddle
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />

      {/* BOTTOM */}
      <CashShareBottom
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />
    </div>
  );
}
