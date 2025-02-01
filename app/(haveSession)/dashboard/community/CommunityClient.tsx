"use client";

import { useState, useEffect } from "react";
import { TablePageResponse } from "@/types/common/commonType";
import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import { Session } from "next-auth";
import ms from "./Community.module.scss";
import Tab from "@/component/common/Tab/Tab";
import { useRouter } from "next/navigation";
import { makeUrlQuery } from "@/utils/common/common";
import ArtworkClient from "./Artwork/ArtworkClient";
import InfoClient from "./Info/InfoClient";
import Loading from "@/component/common/Loading/Loading";

interface IProps {
  session: Session;
  queryInstance: CommunityRequest;
  tableResponse: TablePageResponse<CommunityResponse[]>;
}

export default function CommunityClient({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가

  // 🚀 데이터를 받아오면 로딩 상태 해제
  useEffect(() => {
    setIsLoading(false);
  }, [tableResponse]);

  return (
    <>
      <Loading text="요청한 데이터를 불러오고 있습니다..." open={isLoading} />
      <div className={ms.wrap}>
        <Tab
          tabTitle={["아트워크", "정보"]}
          defaultActiveIndex={queryInstance.searchType === "ARTWORK" ? 0 : 1}
          color="blue"
          titleClick={(title) => {
            setIsLoading(true); // 🔥 탭 변경 시 로딩 시작
            let newQueryInstance: CommunityRequest | null = null;
            switch (title) {
              case "아트워크":
                newQueryInstance = {
                  ...queryInstance,
                  page: 1,
                  searchType: "ARTWORK",
                  searchKeyWord: "",
                };
                break;
              case "정보":
                newQueryInstance = {
                  ...queryInstance,
                  page: 1,
                  searchType: "INFO",
                  searchKeyWord: "",
                };
                break;
              default:
                newQueryInstance = {
                  ...queryInstance,
                  page: 1,
                  searchType: "ARTWORK",
                  searchKeyWord: "",
                };
                break;
            }

            router.replace(
              `/dashboard/community?${makeUrlQuery(newQueryInstance)}`
            );
            router.refresh();
          }}
        >
          <ArtworkClient
            session={session}
            queryInstance={queryInstance}
            tableResponse={tableResponse}
          />
          <InfoClient
            session={session}
            queryInstance={queryInstance}
            tableResponse={tableResponse}
          />
        </Tab>
      </div>
    </>
  );
}
