"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import ms from "./Org.module.scss";
import { useEffect, useRef, useState } from "react";
import { UserAuthType } from "@/types/common/commonType";
import Chip from "@/component/common/Chip/Chip";
import Dialog from "@/component/common/Dialog/Dialog";
import GuildOrgDialog from "./GuildOrgDialog";
interface IProps {
  session: Session;
  userList: UserResponse[];
}

type GroupedUsers = Record<UserAuthType, UserResponse[]>;

export default function OrgLeftTabClient({ session, userList }: IProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [selectUserChip, setSelectUserChip] = useState<UserResponse | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>({
    LEADER: [],
    DEPUTY_LEADER: [],
    ELDER: [],
    MEMBER: [],
    TRAINEE: [],
  });

  useEffect(() => {
    if (userList) {
      // 권한별로 분류
      const grouped: GroupedUsers = {
        LEADER: [],
        DEPUTY_LEADER: [],
        ELDER: [],
        MEMBER: [],
        TRAINEE: [],
      };

      userList.forEach((user) => {
        grouped[user.authType].push(user);
      });

      setGroupedUsers(grouped);
    }
  }, [userList]);

  function chipClick(user: UserResponse) {
    setOpen(true);
    setSelectUserChip(user);
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
                    chipClick(user);
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
                    chipClick(user);
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
                    chipClick(user);
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
                    chipClick(user);
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
                    chipClick(user);
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
    </div>
  );
}
