"use client";

import PagingComponent from "@/component/common/Paging/Paging";
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
  console.log("queryInstance ", queryInstance);
  console.log("tableResponse ", tableResponse);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 현재 페이지 번호를 가져옵니다.
  const currentPage = Number(searchParams.get("page")) || 1;
  return (
    <div>
      <PagingComponent
        onClickEvent={(page: number) => {
          // 페이지 번호가 변경된 경우에만 쿼리 업데이트
          if (page !== currentPage) {
            const newQueryString: CashshareRequest = {
              ...queryInstance,
              size: queryInstance.size, // 기존 size 유지
              page: page, // 클릭된 페이지
            };

            // 쿼리스트링에 lastDoc을 포함하여 URL 업데이트
            router.replace(
              `/dashboard/cashshare?${makeUrlQuery(newQueryString)}`
            );
          }
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
