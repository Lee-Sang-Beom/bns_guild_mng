"use client";

import { TablePageResponse } from "@/types/common/commonType";
import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import { Session } from "next-auth";
import ms from "./Community.module.scss";
import Tab from "@/component/common/Tab/Tab";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { makeUrlQuery } from "@/utils/common/common";
import ArtworkClient from "./Artwork/ArtworkClient";
import InfoClient from "./Info/InfoClient";

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

  return (
    <div className={ms.wrap}>
      <Tab
        tabTitle={["아트워크", "정보"]}
        color="blue"
        titleClick={(title) => {
          const tabTitle = title;
          let newQueryInstance: CommunityRequest | null = null;
          switch (tabTitle) {
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
  );
}
