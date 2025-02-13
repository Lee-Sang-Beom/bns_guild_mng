"use client";
import ms from "./Dashboard.module.scss";
import Link from "next/link";
import { SiDatadog } from "react-icons/si";
import { useEffect } from "react";
import { useGetRecentUpdateDates } from "@/hooks/dashboard/useGetRecentUpdateDates";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/response";
export default function DisplayUpdateCard() {
  const { data } = useGetRecentUpdateDates();

  useEffect(() => {
    console.log("data is ", data);
  }, [data]);
  return (
    <div className={`${ms.card} ${ms.card_middle}`}>
      {data && data.length > 0 ? (
        <ul>
          <li>
            <span className={`${ms.notice_title} ${ms.header}`}>제목</span>
            <span className={`${ms.notice_writerId} ${ms.header}`}>작성자</span>
            <span className={`${ms.regDt} ${ms.header}`}>등록일</span>
          </li>
          {data.map((updateItem: NoticeResponse) => {
            // 등록일
            const timestamp = updateItem.regDt;
            const dateString = timestamp
              ? new Date(timestamp.seconds * 1000).toLocaleString()
              : "-";

            return (
              <Link
                key={`${updateItem.docId}_link`}
                href={`/dashboard/update/detail?doc=${updateItem.docId}`}
              >
                <li>
                  <span className={ms.notice_title}>{updateItem.title}</span>
                  <span className={ms.notice_writerId}>
                    {updateItem.writerId}
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
