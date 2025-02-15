"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import ms from "../Org.module.scss";
import { adminAuthTypes, userAuthList } from "@/datastore/common/common";
import Dialog from "@/component/common/Dialog/Dialog";
import ApprovalDialog from "./ApprovalDialog";
interface IProps {
  session: Session;
  userList: UserResponse[];
}

export function OrgRightTabClient({ session, userList }: IProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [userCount, setUserCount] = useState<number>(
    userList && userList.length > 0 ? userList.length : 0
  );

  const [open, setOpen] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<UserResponse | null>(null);
  const ref = useRef<HTMLButtonElement | null>(null);

  // 관리자 여부 확인
  useEffect(() => {
    const loginUserAuthType = session.user.authType;
    const findIsAdmin = adminAuthTypes.find(
      (auth) => auth === loginUserAuthType
    );
    setIsAdmin(findIsAdmin ? true : false);
  }, [session]);

  // 로그인 요청 유저 수 세팅
  useEffect(() => {
    setUserCount(userList && userList.length > 0 ? userList.length : 0);
  }, [userList]);

  return (
    <div className={ms.inner}>
      {isAdmin ? (
        <>
          {userCount > 0 ? (
            <div className={ms.card_box}>
              {userList.map((user) => {
                const authName = userAuthList.find(
                  (auth) => user.authType === auth.value
                )!.name;
                return (
                  <button
                    className={ms.card}
                    key={user.id}
                    onClick={() => {
                      setSelectUser(user);
                      setOpen(true);
                    }}
                  >
                    <p>
                      <span className={ms.key}>닉네임</span>
                      <span className={ms.value}>{user.id}</span>
                    </p>
                    <p>
                      <span className={ms.key}>성별</span>
                      <span className={ms.value}>
                        {user.gender === "MALE" ? "남" : "여"}
                      </span>
                    </p>
                    <p>
                      <span className={ms.key}>생년월일</span>
                      <span className={ms.value}>{user.userBirth}</span>
                    </p>
                    <p>
                      <span className={ms.key}>직업</span>
                      <span className={ms.value}>{user.job}</span>
                    </p>
                    <p>
                      <span className={ms.key}>요청 권한</span>
                      <span className={ms.value}>{authName}</span>
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={ms.no_user}>
              <img src="/img/no_user.jpg" alt="농담곰 슬픈이미지" />
              로그인 승인을 기다리는 유저가 없습니다.
            </div>
          )}
        </>
      ) : (
        <div className={ms.no_user}>
          <img src="/img/no_user.jpg" alt="농담곰 슬픈이미지" />본 영역은 관리자
          외의 접근을 허용하지 않습니다.
        </div>
      )}

      {/* 승인 관리 */}
      {selectUser && (
        <Dialog
          type="alert"
          width="sm"
          open={open}
          setOpen={setOpen}
          title={"승인 관리"}
          ref={ref}
          paperHidden={true}
        >
          <ApprovalDialog
            session={session}
            setOpen={setOpen}
            data={selectUser}
          />
        </Dialog>
      )}
    </div>
  );
}
