"use client";

import Chip from "@/component/common/Chip/Chip";
import PagingComponent from "@/component/common/Paging/Paging";
import Table, { TableHeader } from "@/component/common/Table/Table";
import { TablePageResponse } from "@/types/common/commonType";
import {
  CashshareRequest,
  CashshareResponse,
} from "@/types/haveSession/dashboard/cashshare/request";
import { makeUrlQuery } from "@/utils/common/common";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
  session: Session;
  queryInstance: CashshareRequest;

  tableResponse: TablePageResponse<CashshareResponse[]>;
}
export default function CashShareBottom({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  console.log("tableResponse is ", tableResponse);
  console.log("session is ", session);
  const router = useRouter();

  const tableHeader: TableHeader[] = [
    {
      name: "단계",
      value: "step",
      accessFn: (item: CashshareResponse, idx: number) => {
        const step = item.step;
        const stepValue =
          step === "TRANSACTION_REGISTRATION"
            ? "거래등록"
            : step === "TRANSACTION_COMPLETED"
            ? "거래완료"
            : "분배완료";
        return (
          <p className="table_header_text" key={`${item.docId}_step`}>
            {stepValue}
          </p>
        );
      },
    },
    {
      name: "대표 판매자",
      value: "sellerId",
    },
    {
      name: "파티원 목록",
      value: "distributionUserList",
      width: "20%",
      accessFn: (item: CashshareResponse, idx: number) => {
        return (
          <div
            className="table_header_flex"
            key={`${item.docId}_distributionUserList`}
          >
            {item.distributionUserList.map((user) => {
              return (
                <Chip
                  widthStyle="fit-content"
                  chipData={{
                    name: user,
                    value: user,
                    group: "",
                  }}
                  color={user === session.user.id ? "blue" : "white"}
                  title={`${item.docId}_distributionUserList_${user}`}
                  key={`${item.docId}_distributionUserList_${user}`}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      name: "판매물품",
      value: "itemName",
    },
    {
      name: "물품 총 가격",
      value: "totalPrice",
      accessFn: (item: CashshareResponse, idx: number) => {
        return (
          <p className="table_header_text" key={`${item.docId}_totalPrice`}>
            {`${item.totalPrice.toLocaleString()}금`}
          </p>
        );
      },
    },
    {
      name: "인당 분배금",
      value: "distributionPrice",
    },
    {
      name: "등록 일시",
      value: "regDt",
      accessFn: (item: CashshareResponse, idx: number) => {
        // regDt가 Timestamp 객체라면 Date로 변환 후 포맷
        const timestamp = item.regDt; // Firebase Timestamp 객체
        if (timestamp && timestamp.seconds) {
          const date = new Date(timestamp.seconds * 1000); // 초 단위로 변환
          return <p key={`${item.docId}_regDt`}>{date.toLocaleString()}</p>; // 로컬 시간 포맷으로 출력
        }
        return <p key={`${item.docId}_regDt_등록일 없음`}>등록일 없음</p>;
      },
    },
  ];

  return (
    <div>
      <Table<CashshareResponse>
        data={
          tableResponse && tableResponse.content ? tableResponse.content : []
        }
        headers={tableHeader}
        tableType={"vertical"}
        tableCaption={""}
        itemTitle={""}
        ref={null}
        trHover
      />
      <PagingComponent
        onClickEvent={(page: number) => {
          const newQueryString: CashshareRequest = {
            ...queryInstance,
            size: queryInstance.size, // 기존 size 유지
            page: page, // 클릭된 페이지
          };

          // 쿼리스트링에 lastDoc을 포함하여 URL 업데이트
          router.replace(
            `/dashboard/cashshare?${makeUrlQuery(newQueryString)}`
          );
        }}
        pagingData={{
          first: tableResponse?.first ?? false,
          last: tableResponse?.last ?? false,
          size: tableResponse?.size ?? 10,
          totalPages: tableResponse?.totalPages ?? 1,
          totalElements: tableResponse?.totalElements ?? 0,
          number: tableResponse?.number ?? 0,
        }}
      />
    </div>
  );
}
