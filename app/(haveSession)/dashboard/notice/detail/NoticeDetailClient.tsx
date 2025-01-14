"use client";

import { NoticeResponse } from "@/types/haveSession/dashboard/notice/request";
import ms from "./NoticeDetail.module.scss";
import TableDetail from "@/component/common/TableDetail/TableDetail";
import { useRef } from "react";
interface IProps {
  data: NoticeResponse;
}
export default function NoticeDetailClient({ data }: IProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <div className={ms.wrap}>
      <TableDetail
        ref={tableRef}
        title={data.title}
        content={data.content}
        writerId={data.writerId}
      />
    </div>
  );
}
