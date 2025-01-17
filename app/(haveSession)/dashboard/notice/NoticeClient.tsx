"use client";

import { Session } from "next-auth";
import ms from "./Notice.module.scss";
import { TablePageResponse } from "@/types/common/commonType";
import { NoticeRequest } from "@/types/haveSession/dashboard/notice/request";
import NoticeTop from "./NoticeTop";
import NoticeMiddle from "./NoticeMiddle";
import NoticeBottom from "./NoticeBottom";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/response";

interface IProps {
  session: Session;
  queryInstance: NoticeRequest;
  tableResponse: TablePageResponse<NoticeResponse[]>;
}
export default function NoticeClient({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <NoticeTop session={session} />

      {/* MIDDLE */}
      <NoticeMiddle
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />

      {/* BOTTOM */}
      <NoticeBottom
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />
    </div>
  );
}
