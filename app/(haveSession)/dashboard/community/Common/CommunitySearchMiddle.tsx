"use client";

import { makeUrlQuery } from "@/utils/common/common";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import ms from "../Community.module.scss";
import { useEffect, useState } from "react";
import Input from "@/component/common/Input/Input";
import useDebounce from "@/hooks/common/debounce/useDebounce";
import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";

interface IProps {
  session: Session;
  queryInstance: CommunityRequest;
}

export default function CommunitySearchMiddle({
  session,
  queryInstance,
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
      router.replace(`/dashboard/community?${makeUrlQuery(newQueryString)}`);
    }
  }, [debouncedSearchKeyWord]);

  return (
    <div className={ms.middle}>
      <div className={ms.inner}>
        {/* 검색어 */}
        <div className={ms.inp_box}>
          <span className={ms.label}>{`검색어(제목)`}</span>
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
