"use client";
import ms from "./Dashboard.module.scss";
import { useGetRecentNoticeDates } from "@/hooks/dashboard/useGetRecentNoticeDates";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/request";
import { makeUrlQuery } from "@/utils/common/common";
import Link from "next/link";
import { SiDatadog } from "react-icons/si";
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
              <Link
                key={`${noticeItem.docId}_link`}
                href={`/dashboard/notice/detail?doc=${noticeItem.docId}`}
              >
                <li>
                  <span className={ms.notice_title}>{noticeItem.title}</span>
                  <span className={ms.notice_writerId}>
                    {noticeItem.writerId}
                  </span>
                  <span className={ms.regDt}>{dateString}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p className={ms.no_data}>
          <SiDatadog
            size={28}
            role="img"
            aria-label="사진을 물고있는 개 아이콘"
          />
          등록된 정보가 없습니다.
        </p>
      )}
    </div>
  );
}
