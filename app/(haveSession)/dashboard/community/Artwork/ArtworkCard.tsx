"use client";

import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import ms from "../Community.module.scss";
import Link from "next/link";
interface IProps {
  data: CommunityResponse[];
}

const extractImageSrc = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const img = doc.querySelector("img"); // 첫 번째 <img> 태그를 선택
  return img ? img.src : null; // 이미지가 없으면 null 반환
};

export default function ArtworkCard({ data }: IProps) {
  return (
    <div className={ms.card_wrap}>
      {data && data.length > 0 ? (
        <div className={ms.card_box}>
          {data.map((doc: CommunityResponse) => {
            const docTitle = doc.title;
            const docWriterId = doc.writerId;
            const docContent = doc.content;
            const timestamp = doc.regDt; // Firebase Timestamp 객체
            const date = new Date(timestamp.seconds * 1000).toLocaleString(); // 초 단위로 변환

            const thumbnailSrc = extractImageSrc(docContent);
            return (
              <Link
                className={ms.card}
                key={doc.docId}
                title={`${doc.title} 상세 보기 페이지 이동`}
                href={`/dashboard/community/detail?doc=${doc.docId}`}
              >
                <p className={ms.card_title}>{docTitle}</p>
                <p className={ms.card_desc}>
                  {docWriterId} / {date}
                </p>
                <div className={ms.img_box}>
                  <img
                    src={thumbnailSrc || "/img/no_img.jpg"}
                    alt="thumbnail"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className={ms.no_data}>데이터가 없습니다.</div>
      )}
    </div>
  );
}
