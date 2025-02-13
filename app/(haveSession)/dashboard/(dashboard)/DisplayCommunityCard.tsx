"use client";
import ms from "./Dashboard.module.scss";
import Link from "next/link";
import { SiDatadog } from "react-icons/si";
import { useGetRecentCommunityDates } from "@/hooks/dashboard/useGetRecentCommunityDates";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
export default function DisplayCommunityCard() {
  const { data } = useGetRecentCommunityDates();

  return (
    <div className={`${ms.card} ${ms.card_middle}`}>
      {data && data.length > 0 ? (
        <ul>
          <li>
            <span className={`${ms.notice_title} ${ms.header}`}>제목</span>
            <span className={`${ms.notice_writerId} ${ms.header}`}>작성자</span>
            <span className={`${ms.type} ${ms.header}`}>종류</span>
            <span className={`${ms.regDt} ${ms.header}`}>등록일</span>
          </li>
          {data.map((communityItem: CommunityResponse) => {
            // 등록일
            const timestamp = communityItem.regDt;
            const dateString = timestamp
              ? new Date(timestamp.seconds * 1000).toLocaleString()
              : "-";

            let docTypeString: string = "";

            switch (communityItem.docType) {
              case "ARTWORK":
                docTypeString = "아트워크";
                break;
              case "INFO":
                docTypeString = "정보(팁)";
                break;
              default:
                break;
            }
            return (
              <Link
                key={`${communityItem.docId}_link`}
                href={`/dashboard/community/detail?doc=${communityItem.docId}`}
              >
                <li>
                  <span className={ms.notice_title}>{communityItem.title}</span>
                  <span className={ms.notice_writerId}>
                    {communityItem.writerId}
                  </span>
                  <span className={ms.type}>{docTypeString}</span>
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
