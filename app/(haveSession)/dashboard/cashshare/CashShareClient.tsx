"use client";

import { Session } from "next-auth";
import ms from "./CashShare.module.scss";
import CashShareTop from "./CashShareTop";
import CashShareBottom from "./CashShareBottom";
import {
  CashshareRequest,
  CashshareResponse,
} from "@/types/haveSession/dashboard/cashshare/request";
import { TablePageResponse } from "@/types/common/commonType";

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

      {/* BOTTOM */}
      <CashShareBottom
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />
    </div>
  );
}
