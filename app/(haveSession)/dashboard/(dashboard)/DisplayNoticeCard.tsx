"use client";
import { useGetRecentCashShareDates } from "@/hooks/dashboard/useGetRecentCashShareDates";
import ms from "./Dashboard.module.scss";
import { useEffect } from "react";
import { CashshareResponse } from "@/types/haveSession/dashboard/cashshare/request";
import clsx from "clsx";
import tms from "@/styles/tableHeader.module.scss";
import { useGetRecentNoticeDates } from "@/hooks/dashboard/useGetRecentNoticeDates";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/request";

export default function DisplayCashShareCard() {
  const { data } = useGetRecentNoticeDates();

  return (
    <div className={`${ms.card} ${ms.card_middle}`}>
      {data && data.length > 0 ? (
        <ul>
          <li>
            <span className={`${ms.notice_title} ${ms.header}`}>제목</span>
            <span className={`${ms.notice_writerId} ${ms.header}`}>작성자</span>
            <span className={`${ms.regDt} ${ms.header}`}>등록일</span>
          </li>
          {data.map((noticeItem: NoticeResponse) => {
            // 등록일
            const timestamp = noticeItem.regDt;
            const dateString = timestamp
              ? new Date(timestamp.seconds * 1000).toLocaleString()
              : "-";

            return (
              <li key={noticeItem.docId}>
                <span className={ms.notice_title}>{noticeItem.title}</span>
                <span className={ms.notice_writerId}>
                  {noticeItem.writerId}
                </span>
                <span className={ms.regDt}>{dateString}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={ms.no_data}>등록된 정보가 없습니다.</p>
      )}
    </div>
  );
}
