"use client";

import { Session } from "next-auth";
import ms from "./Update.module.scss";
import { TablePageResponse } from "@/types/common/commonType";
import { UpdateResponse } from "@/types/haveSession/dashboard/update/response";
import { UpdateRequest } from "@/types/haveSession/dashboard/update/request";
import UpdateTop from "./UpdateTop";
import UpdateMiddle from "./UpdateMiddle";
import UpdateBottom from "./UpdateBottom";

interface IProps {
  session: Session;
  queryInstance: UpdateRequest;
  tableResponse: TablePageResponse<UpdateResponse[]>;
}
export default function UpdateClient({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <UpdateTop session={session} />

      {/* MIDDLE */}
      <UpdateMiddle
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />

      {/* BOTTOM */}
      <UpdateBottom
        session={session}
        queryInstance={queryInstance}
        tableResponse={tableResponse}
      />
    </div>
  );
}
