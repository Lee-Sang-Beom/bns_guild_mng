"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useState } from "react";
import ms from "./OrgDialog.module.scss";
import { userAuthList } from "@/datastore/common/common";
import Button from "@/component/common/Button/Button";
import {
  approvalCollectionUser,
  withdrawCollectionUser,
} from "@/utils/haveSession/dashboard/org/action";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: UserResponse;
}
export default function ApprovalDialog({ session, setOpen, data }: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();

  const [authName] = useState<string>(
    userAuthList.find((auth) => data.authType === auth.value)!.name
  );

  async function onMutate(action: string, user: UserResponse) {
    try {
      let res = null;
      if (action === "WITHDRAW") {
        res = await withdrawCollectionUser(user, "RIGHT"); // 탈퇴 처리 호출
      } else {
        res = await approvalCollectionUser(user); // 승인 처리 호출
      }
      setText(res.message);
      setIsChange(true);
      setStatus("success");
    } catch (error: any) {
      setText(error || "작업 처리 중 문제가 발생했습니다.");
      setIsChange(true);
      setStatus("error");
    } finally {
      setOpen(false); // 다이얼로그 닫기
      router.refresh();
    }
  }
  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <div className={ms.top}>
        <p className={ms.title}>요청정보</p>
        <ul>
          <li>
            <span className={ms.key}>닉네임</span>
            <span className={ms.value}>{data.id}</span>
          </li>
          <li>
            <span className={ms.key}>성별</span>
            <span className={ms.value}>
              {data.gender === "MALE" ? "남" : "여"}
            </span>
          </li>
          <li>
            <span className={ms.key}>생년월일</span>
            <span className={ms.value}>{data.userBirth}</span>
          </li>
          <li>
            <span className={ms.key}>직업</span>
            <span className={ms.value}>{data.job}</span>
          </li>
          <li>
            <span className={ms.key}>요청 권한</span>
            <span className={ms.value}>{authName}</span>
          </li>
        </ul>
      </div>

      {/* BOTTOM */}
      <div className={ms.bottom}>
        {/* 반려 */}
        <div className={ms.btn_box}>
          <Button
            color={"red_reverse"}
            title={"반려(회원탈퇴)"}
            id={"withdraw"}
            size="md"
            onClick={(e) => {
              onMutate("WITHDRAW", data);
            }}
          >
            반려
          </Button>
        </div>

        {/* 승인 */}
        <div className={ms.btn_box}>
          <Button
            color={"blue_reverse"}
            title={"승인"}
            id={"approval"}
            size="md"
            onClick={(e) => {
              onMutate("APPROVAL", data);
            }}
          >
            승인
          </Button>
        </div>
      </div>
    </div>
  );
}
