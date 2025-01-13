"use client";

import PagingComponent from "@/component/common/Paging/Paging";
import { TablePageResponse } from "@/types/common/commonType";
import {
  CashshareRequest,
  CashshareResponse,
  DistributionStepType,
} from "@/types/haveSession/dashboard/cashshare/request";
import { makeUrlQuery } from "@/utils/common/common";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import ms from "./CashShare.module.scss";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { distributionStepList } from "@/datastore/dashboard/cashshare/cashshare";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "@/component/common/Input/Input";
import useDebounce from "@/hooks/common/debounce/useDebounce";

interface IProps {
  session: Session;
  queryInstance: CashshareRequest;
  tableResponse: TablePageResponse<CashshareResponse[]>;
}

export default function CashShareMiddle({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  const router = useRouter();
  const [searchKeyWord, setSearchKeyWord] = useState<string>(
    queryInstance.searchKeyWord
  );

  // 디바운싱을 위한 useDebounce 훅 사용
  const debouncedSearchKeyWord = useDebounce(searchKeyWord, 500); // 500ms 지연

  // debouncedSearchKeyWord를 이용하여 URL 업데이트
  useEffect(() => {
    if (debouncedSearchKeyWord !== queryInstance.searchKeyWord) {
      const newQueryString = {
        ...queryInstance,
        page: 0,
        searchKeyWord: debouncedSearchKeyWord,
      };
      router.replace(`/dashboard/cashshare?${makeUrlQuery(newQueryString)}`);
    }
  }, [debouncedSearchKeyWord]);

  return (
    <div className={ms.middle}>
      <div className={ms.inner}>
        {/* 거래단계 */}
        <div className={ms.inp_box}>
          <span className={ms.label}>거래단계</span>
          <div className={ms.inp}>
            <Selectbox
              items={distributionStepList}
              placeholder="거래단계 선택"
              title="거래단계 선택"
              color="white"
              size="md"
              onChange={function (event: SelectChangeEvent): void {
                const targetValue = event.target.value as DistributionStepType;
                const newQueryString = {
                  ...queryInstance,
                  page: 0,
                  stepType: targetValue,
                };
                router.replace(
                  `/dashboard/cashshare?${makeUrlQuery(newQueryString)}`
                );
              }}
              value={queryInstance.stepType}
            />
          </div>
        </div>

        {/* 검색종류 */}
        <div className={ms.inp_box}>
          <span className={ms.label}>검색종류</span>
          <div className={ms.inp}>
            <Selectbox
              items={[
                { name: "대표 판매자", value: "SELLER_ID", group: "" },
                {
                  name: "파티원 목록",
                  value: "INCLUDE_DISTRIBUTION",
                  group: "",
                },
                { name: "판매 물품", value: "ITEM_NAME", group: "" },
              ]}
              placeholder="검색종류 선택"
              title="검색종류 선택"
              color="white"
              size="md"
              onChange={function (event: SelectChangeEvent): void {
                const targetValue = event.target.value as DistributionStepType;
                const newQueryString = {
                  ...queryInstance,
                  page: 0,
                  searchType: targetValue,
                };
                router.replace(
                  `/dashboard/cashshare?${makeUrlQuery(newQueryString)}`
                );
              }}
              value={queryInstance.searchType}
            />
          </div>
        </div>

        {/* 검색어 */}
        <div className={ms.inp_box}>
          <span className={ms.label}>
            검색어 <span className="essential">*</span>
          </span>
          <div className={ms.inp}>
            <Input
              type="text"
              placeholder="검색어를 입력해주세요."
              title="검색어"
              id="itemName"
              inpSize="md"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchKeyWord(event.target.value); // 입력값을 상태에 반영
              }}
              value={searchKeyWord}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
