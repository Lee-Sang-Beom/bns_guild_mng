"use client";
import ms from "./Dashboard.module.scss";
import Link from "next/link";
import { SiDatadog } from "react-icons/si";
import { useEffect } from "react";
import { useGetRecentUpdateDates } from "@/hooks/dashboard/useGetRecentUpdateDates";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/response";
import { MdOutlineFiberNew } from "react-icons/md";
import { getDashboardDateStringAndIsNew } from "@/utils/haveSession/dashboard/dashboard/action";
export default function DisplayUpdateCard() {
  const { data } = useGetRecentUpdateDates();

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
            const { dateString, isNew } = getDashboardDateStringAndIsNew(
              updateItem.regDt
            );
            return (
              <Link
                key={`${updateItem.docId}_link`}
                href={`/dashboard/update/detail?doc=${updateItem.docId}`}
              >
                <li>
                  <span className={ms.notice_title}>
                    {updateItem.title}
                    {isNew && (
                      <MdOutlineFiberNew
                        role="img"
                        aria-label="NEW 문자열 아이콘"
                        color="red"
                        size={24}
                        className={ms.new_ico}
                      />
                    )}
                  </span>
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
