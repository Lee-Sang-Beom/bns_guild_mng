"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import ms from "../Org.module.scss";
import { useEffect, useRef, useState } from "react";
import { UserAuthType } from "@/types/common/commonType";
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
type GroupedUsers = Record<UserAuthType, UserResponse[]>;
type GroupedSubUsers = Record<UserAuthType, SubUserDocResponse[]>;

export default function OrgMiddleTabClient({ session }: IProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [selectUserChip, setSelectUserChip] = useState<UserResponse | null>(
    null
  );
  const [selectSubUserChip, setSelectSubUserChip] =
    useState<SubUserDocResponse | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>({
    LEADER: [],
    DEPUTY_LEADER: [],
    ELDER: [],
    MEMBER: [],
    TRAINEE: [],
  });
  const [groupedSubUsers, setGroupedSubUsers] = useState<GroupedSubUsers>({
    LEADER: [],
    DEPUTY_LEADER: [],
    ELDER: [],
    MEMBER: [],
    TRAINEE: [],
  });

  const { data: userList } = useGetActiveUserList();
  const { data: subUserList } = useGetActiveSubUserList();

  useEffect(() => {
    if (userList) {
      // 권한별로 분류 - 본캐릭터
      const grouped: GroupedUsers = {
        LEADER: [],
        DEPUTY_LEADER: [],
        ELDER: [],
        MEMBER: [],
        TRAINEE: [],
      };

      // 권한별로 분류 - 서브캐릭터터
      const groupedSub: GroupedSubUsers = {
        LEADER: [],
        DEPUTY_LEADER: [],
        ELDER: [],
        MEMBER: [],
        TRAINEE: [],
      };

      userList.forEach((user) => {
        grouped[user.authType].push(user);
      });
      subUserList.forEach((user) => {
        groupedSub[user.authType].push(user);
      });

      setGroupedUsers(grouped);
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
        <div className={ms.role_box}>
          <p className={ms.role_title}>문파장</p>
          <div className={ms.role_list}>
            {groupedUsers.LEADER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.id ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    userChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
            {groupedSubUsers.LEADER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.parentId ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    subUserChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        </div>
        <div className={ms.role_box}>
          <p className={ms.role_title}>부문파장</p>
          <div className={ms.role_list}>
            {groupedUsers.DEPUTY_LEADER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.id ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    userChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
            {groupedSubUsers.DEPUTY_LEADER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.parentId ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    subUserChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        </div>
        <div className={ms.role_box}>
          <p className={ms.role_title}>문파장로</p>
          <div className={ms.role_list}>
            {groupedUsers.ELDER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.id ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    userChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
            {groupedSubUsers.ELDER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.parentId ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    subUserChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        </div>
        <div className={ms.role_box}>
          <p className={ms.role_title}>문파원</p>
          <div className={ms.role_list}>
            {groupedUsers.MEMBER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.id ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    userChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
            {groupedSubUsers.MEMBER.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.parentId ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    subUserChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        </div>
        <div className={ms.role_box}>
          <p className={ms.role_title}>연습생</p>
          <div className={ms.role_list}>
            {groupedUsers.TRAINEE.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.id ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    userChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
            {groupedSubUsers.TRAINEE.map((user) => {
              return (
                <Chip
                  key={`${user.id}_${user.docId}`}
                  widthStyle="fit-content"
                  chipData={{
                    name: user.id,
                    value: user.id,
                    group: "",
                  }}
                  color={session.user.id === user.parentId ? "blue" : "white"}
                  title={`${user.id}_${user.docId}`}
                  onClick={() => {
                    subUserChipClick(user);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        </div>
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
