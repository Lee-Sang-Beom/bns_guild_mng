"use client";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/response";
import ms from "./Dashboard.module.scss";
import { useGetRecentNoticeDates } from "@/hooks/dashboard/useGetRecentNoticeDates";
import Link from "next/link";
import { SiDatadog } from "react-icons/si";
import { getDashboardDateStringAndIsNew } from "@/utils/haveSession/dashboard/dashboard/action";
import { MdOutlineFiberNew } from "react-icons/md";
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
            const { dateString, isNew } = getDashboardDateStringAndIsNew(
              noticeItem.regDt
            );
            return (
              <Link
                key={`${noticeItem.docId}_link`}
                href={`/dashboard/notice/detail?doc=${noticeItem.docId}`}
              >
                <li>
                  <span className={ms.notice_title}>
                    {noticeItem.title}
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
