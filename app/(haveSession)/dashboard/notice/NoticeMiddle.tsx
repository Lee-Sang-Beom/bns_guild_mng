"use client";

import PagingComponent from "@/component/common/Paging/Paging";
import { TablePageResponse } from "@/types/common/commonType";

import { makeUrlQuery } from "@/utils/common/common";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import ms from "./CashShare.module.scss";
import { useEffect, useState } from "react";
import Input from "@/component/common/Input/Input";
import useDebounce from "@/hooks/common/debounce/useDebounce";
import {
  NoticeRequest,
  NoticeResponse,
} from "@/types/haveSession/dashboard/notice/request";

interface IProps {
  session: Session;
  queryInstance: NoticeRequest;
  tableResponse: TablePageResponse<NoticeResponse[]>;
}

export default function NoticeMiddle({
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
        page: 1,
        searchKeyWord: debouncedSearchKeyWord,
      };
      router.replace(`/dashboard/notice?${makeUrlQuery(newQueryString)}`);
    }
  }, [debouncedSearchKeyWord]);

  return (
    <div className={ms.middle}>
      <div className={ms.inner}>
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
