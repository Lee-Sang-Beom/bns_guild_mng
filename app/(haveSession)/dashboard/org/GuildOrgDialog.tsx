"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ms from "./OrgDialog.module.scss";
import { adminAuthTypes, userAuthList } from "@/datastore/common/common";
import Button from "@/component/common/Button/Button";
import {
  approvalCollectionUser,
  withdrawCollectionUser,
} from "@/utils/haveSession/dashboard/org/action";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { maskUserBirth } from "@/utils/common/common";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: UserResponse;
}
export default function GuildOrgDialog({ session, setOpen, data }: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [authName] = useState<string>(
    userAuthList.find((auth) => data.authType === auth.value)!.name
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSelf, setIsSelf] = useState<boolean>(false);

  async function onMutate(action: string, user: UserResponse) {
    try {
      const res = await withdrawCollectionUser(user, "LEFT"); // 탈퇴 처리 호출
      setText(res.message);
      setIsChange(true);
      setStatus("success");
    } catch (error: any) {
      setText(error || "작업 처리 중 문제가 발생했습니다.");
      setIsChange(true);
      setStatus("error");
    } finally {
      if (session.user.id === data.id) {
        await signOut({
          redirect: false,
        });

        setText("회원탈퇴를 진행하여 자동 로그아웃을 진행합니다.");
        setStatus("success");
        setIsChange(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        setOpen(false); // 다이얼로그 닫기
        queryClient.invalidateQueries({
          queryKey: ["useGetActiveUserList"], // 조직도 본 캐릭터 리스트
        });
        queryClient.invalidateQueries({
          queryKey: ["useGetActiveSubUserList"], // 조직도 서브 캐릭터 리스트
        });
        router.refresh();
      }
    }
  }

  useEffect(() => {
    const loginUserAuthType = session.user.authType;
    const findIsAdmin = adminAuthTypes.find(
      (auth) => auth === loginUserAuthType
    );
    setIsAdmin(findIsAdmin ? true : false);
    setIsSelf(session.user.id === data.id);
  }, [session]);

  return (
    <div className={ms.wrap}>
      {/* TOP */}
      <div className={ms.top}>
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

          {/* 관리자이거나 본인이면 생년월일 그대로 표시(아니면 마스킹) */}
          <li>
            <span className={ms.key}>생년월일</span>
            <span className={ms.value}>
              {isAdmin || isSelf
                ? data.userBirth
                : maskUserBirth(data.userBirth)}
            </span>
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

        {/* 회원탈퇴 */}
        {session.user.id === data.id || isAdmin ? (
          <div className={ms.btn_box}>
            <Button
              color={"red_reverse"}
              title={"회원탈퇴"}
              id={"withdraw"}
              size="md"
              onClick={(e) => {
                const confirmed = window.confirm(
                  "정말 회원탈퇴를 진행하시겠습니까? 서브 캐릭터 정보도 함께 삭제됩니다."
                );
                if (confirmed) {
                  onMutate("WITHDRAW", data); // 탈퇴 로직 실행
                }
              }}
            >
              회원탈퇴
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
