"use client";

import { Session } from "next-auth";
import { Dispatch, SetStateAction, useState } from "react";
import ms from "../OrgDialog.module.scss";
import { userAuthList } from "@/datastore/common/common";
import Button from "@/component/common/Button/Button";
import { SubUserDocResponse } from "@/types/haveSession/dashboard/dashboard/response";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: SubUserDocResponse;
}
export default function GuildOrgSubCharacterDialog({
  session,
  setOpen,
  data,
}: IProps) {
  const [authName] = useState<string>(
    userAuthList.find((auth) => data.authType === auth.value)!.name
  );

  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <div className={ms.top}>
        <ul>
          <li>
            <span className={ms.key}>본 캐릭터</span>
            <span className={ms.value}>{data.parentId}</span>
          </li>
          <li>
            <span className={ms.key}>닉네임</span>
            <span className={ms.value}>{data.id}</span>
          </li>
          <li>
            <span className={ms.key}>직업</span>
            <span className={ms.value}>{data.job}</span>
          </li>
          <li>
            <span className={ms.key}>권한</span>
            <span className={ms.value}>{authName}</span>
          </li>
        </ul>
      </div>

      {/* BOTTOM */}
      <div className={ms.bottom}>
        {/* 닫기 */}
        <div className={ms.btn_box}>
          <Button
            color={"blue_reverse"}
            title={"닫기"}
            id={"approval"}
            size="md"
            onClick={(e) => {
              setOpen(false);
            }}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
