"use client";
import { useGetRecentCashShareDates } from "@/hooks/dashboard/useGetRecentCashShareDates";
import ms from "./Dashboard.module.scss";
import { useEffect } from "react";
import { CashshareResponse } from "@/types/haveSession/dashboard/cashshare/request";
import clsx from "clsx";
import tms from "@/styles/tableHeader.module.scss";

export default function DisplayCashShareCard() {
  const { data } = useGetRecentCashShareDates();

  return (
    <div className={`${ms.card} ${ms.card_middle}`}>
      {data && data.length > 0 ? (
        <ul>
          <li>
            <span className={`${ms.step} ${ms.header}`}>단계</span>
            <span className={`${ms.itemName} ${ms.header}`}>판매 물품</span>
            <span className={`${ms.totalPrice} ${ms.header}`}>
              물품 총 가격
            </span>
            <span className={`${ms.regDt} ${ms.header}`}>등록일</span>
          </li>
          {data.map((cashData: CashshareResponse) => {
            console.log(cashData);

            // 거래단계
            const step = cashData.step;
            const stepValue =
              step === "TRANSACTION_REGISTRATION"
                ? "거래등록"
                : step === "TRANSACTION_COMPLETED"
                ? "거래완료"
                : "분배완료";

            const borderClsx = clsx({
              [tms.table_header_text]: true,
              [tms.red]: stepValue == "거래등록",
              [tms.blue]: stepValue == "거래완료",
              [tms.gray]: stepValue == "분배완료",
            });

            // 총 가격
            const totalPriceString =
              stepValue != "거래등록"
                ? cashData.totalPrice.toLocaleString() + "금"
                : "미판매";

            // 등록일
            const timestamp = cashData.regDt;
            const dateString = timestamp
              ? new Date(timestamp.seconds * 1000).toLocaleString()
              : "-";

            return (
              <li key={cashData.docId}>
                <span className={`${borderClsx} ${ms.step}`}>{stepValue}</span>
                <span className={ms.itemName}>{cashData.itemName}</span>
                <span className={ms.totalPrice}>{totalPriceString}</span>
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
