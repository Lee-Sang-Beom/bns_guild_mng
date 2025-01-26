import { TablePageResponse } from "@/types/common/commonType";
import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import { Session } from "next-auth";
import ms from "../Community.module.scss";
import CommunitySearchTop from "../Common/CommunitySearchTop";
import CommunitySearchMiddle from "../Common/CommunitySearchMiddle";
import InfoDisplay from "./InfoDisplay";

interface IProps {
  session: Session;
  queryInstance: CommunityRequest;
  tableResponse: TablePageResponse<CommunityResponse[]>;
}

export default function InfoClient({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  return (
    <div className={ms.inner}>
      {/* TOP */}
      <CommunitySearchTop session={session} queryInstance={queryInstance} />

      {/* MIDDLE */}
      <CommunitySearchMiddle session={session} queryInstance={queryInstance} />

      {/* BOTTOM */}
      <InfoDisplay
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />
    </div>
  );
}
