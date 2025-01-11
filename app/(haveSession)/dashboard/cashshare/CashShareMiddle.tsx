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
export default function CashShareMiddle({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  const router = useRouter();

  return <div></div>;
}
