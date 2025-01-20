import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { TablePageResponse } from "@/types/common/commonType";
import { CashshareResponse } from "@/types/haveSession/dashboard/cashshare/response";
import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";
import { getServerSession } from "next-auth";
import CommunityClient from "./CommunityClient";

export default async function CommunityServer({
  searchParams,
}: {
  searchParams: CommunityRequest;
}) {
  const session = await getServerSession(authOptions);
  const isEmptySearchParams = Object.keys(searchParams).length === 0;

  let queryInstance: CommunityRequest = {
    page: 1,
    size: 5,
    sort: "regDt",
    orderBy: "desc",
    searchType: "ARTWORK",
    searchKeyWord: "",
  };

  if (!isEmptySearchParams) {
    queryInstance = {
      ...queryInstance, // DefaultQueryString 세팅
      ...searchParams, // QueryString (검색조건)
    };
  }

  return (
    <CommunityClient
      session={session!}
      queryInstance={queryInstance}
      tableResponse={null}
    />
  );
}
