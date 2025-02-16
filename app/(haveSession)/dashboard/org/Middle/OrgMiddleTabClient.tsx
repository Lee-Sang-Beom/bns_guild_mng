"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import ms from "../Org.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  UserAuthType,
  UserJobType,
  userJobTypeList,
} from "@/types/common/commonType";
import Chip from "@/component/common/Chip/Chip";
import Dialog from "@/component/common/Dialog/Dialog";
import { SubUserDocResponse } from "@/types/haveSession/dashboard/dashboard/response";
import { useGetActiveSubUserList } from "@/hooks/dashboard/org/useGetActiveSubUserList";
import { useGetActiveUserList } from "@/hooks/dashboard/org/useGetActiveUserList";
import GuildOrgDialog from "../GuildOrgDialog";
import GuildOrgSubCharacterDialog from "../GuildOrgSubCharacterDialog";
interface IProps {
  session: Session;
}

// 대표캐릭터, 서브캐릭터 형태
type GroupedUsers = Record<UserJobType, UserResponse[]>;
type GroupedSubUsers = Record<UserJobType, SubUserDocResponse[]>;

export default function OrgMiddleTabClient({ session }: IProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [selectUserChip, setSelectUserChip] = useState<UserResponse | null>(
    null
  );
  const [selectSubUserChip, setSelectSubUserChip] =
    useState<SubUserDocResponse | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>(
    {} as GroupedUsers
  );
  const [groupedSubUsers, setGroupedSubUsers] = useState<GroupedSubUsers>(
    {} as GroupedSubUsers
  );

  const { data: userList } = useGetActiveUserList();
  const { data: subUserList } = useGetActiveSubUserList();

  useEffect(() => {
    if (userList) {
      // UserJobType 기반으로 본캐릭터 그룹화
      const grouped: GroupedUsers = userJobTypeList.reduce((acc, jobType) => {
        acc[jobType] = [];
        return acc;
      }, {} as GroupedUsers);

      // 본캐릭터 리스트를 직업별로 분류
      userList.forEach((user) => {
        if (user.job && grouped[user.job as UserJobType]) {
          // job을 UserJobType으로 캐스팅
          grouped[user.job as UserJobType].push(user);
        }
      });

      // 그룹화된 결과를 상태에 저장
      setGroupedUsers(grouped);
    }

    if (subUserList) {
      // UserJobType 기반으로 서브캐릭터 그룹화
      const groupedSub: GroupedSubUsers = userJobTypeList.reduce(
        (acc, jobType) => {
          acc[jobType] = [];
          return acc;
        },
        {} as GroupedSubUsers
      );

      // 서브캐릭터 리스트를 직업별로 분류
      subUserList.forEach((user) => {
        if (user.job && groupedSub[user.job as UserJobType]) {
          // job을 UserJobType으로 캐스팅
          groupedSub[user.job as UserJobType].push(user);
        }
      });

      setGroupedSubUsers(groupedSub);
    }
  }, [userList, subUserList]);

  // 본캐릭터 클릭
  function userChipClick(user: UserResponse) {
    setOpen(true);
    setSelectUserChip(user);
    setSelectSubUserChip(null);
  }

  // 서브캐릭터 클릭
  function subUserChipClick(user: SubUserDocResponse) {
    setOpen(true);
    setSelectUserChip(null);
    setSelectSubUserChip(user);
  }
  return (
    <div className={ms.inner}>
      {/* LEFT */}
      <div className={`${ms.left} ${ms.logo}`}>
        <div className={ms.circle_bg}></div>
        <div className={ms.circle}></div>
      </div>
      {/* RIGHT */}
      <div className={`${ms.right} ${ms.role}`}>
        {userJobTypeList.map(
          (
            role // 직업별로 표시할 것임임
          ) => (
            <div key={role} className={ms.role_box}>
              <p className={ms.role_title}>{role}</p>
              <div className={ms.role_list}>
                {groupedUsers[role]?.map(
                  (
                    user // 대표캐릭터 먼저 출력
                  ) => (
                    <Chip
                      key={`${user.id}_${user.docId}`}
                      widthStyle="fit-content"
                      chipData={{ name: user.id, value: user.id, group: "" }}
                      color={session.user.id === user.id ? "blue" : "white"}
                      title={`${user.id}_${user.docId}`}
                      onClick={() => userChipClick(user)}
                      style={{ cursor: "pointer" }}
                    />
                  )
                )}
                {groupedSubUsers[role]?.map(
                  (
                    user // 서브캐릭터 다음으로 출력
                  ) => (
                    <Chip
                      key={`${user.id}_${user.docId}`}
                      widthStyle="fit-content"
                      chipData={{ name: user.id, value: user.id, group: "" }}
                      color={
                        session.user.id === user.parentId ? "blue" : "white"
                      }
                      title={`${user.id}_${user.docId}`}
                      onClick={() => subUserChipClick(user)}
                      style={{ cursor: "pointer" }}
                    />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* 문파원 정보 */}
      {selectUserChip && (
        <Dialog
          type="alert"
          width="sm"
          open={open}
          setOpen={setOpen}
          title={"문파원 정보"}
          ref={ref}
          paperHidden={true}
        >
          <GuildOrgDialog
            session={session}
            setOpen={setOpen}
            data={selectUserChip}
          />
        </Dialog>
      )}

      {/* 문파원 서브캐릭터 정보 */}
      {selectSubUserChip && (
        <Dialog
          type="alert"
          width="sm"
          open={open}
          setOpen={setOpen}
          title={"문파원 서브캐릭터 정보"}
          ref={ref}
          paperHidden={true}
        >
          <GuildOrgSubCharacterDialog
            session={session}
            setOpen={setOpen}
            data={selectSubUserChip}
          />
        </Dialog>
      )}
    </div>
  );
}
