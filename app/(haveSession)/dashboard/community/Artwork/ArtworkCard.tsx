"use client";

import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import ms from "../Community.module.scss";
interface IProps {
  data: CommunityResponse[];
}
export default function ArtworkCard({ data }: IProps) {
  return (
    <div className={ms.card_wrap}>
      {data && data.length > 0 ? (
        <div className={ms.card_box}>
          {data.map((doc) => {
            return <div className={ms.card} key={doc.docId}></div>;
          })}
        </div>
      ) : (
        <div className={ms.no_data}>데이터가 없습니다.</div>
      )}
    </div>
  );
}
