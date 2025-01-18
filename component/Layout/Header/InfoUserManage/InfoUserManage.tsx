"use client";

import { BiSolidUserCircle } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import ms from "../Header.module.scss";
import { Session } from "next-auth";
import { GrSettingsOption } from "react-icons/gr";
import React, { useRef, useState } from "react";
import Dialog from "@/component/common/Dialog/Dialog";
import InfoUserManageDialog from "./InfoUserManageDialog";
import InfoSubUserManageDialog from "./InfoSubUserManageDialog";

interface IProps {
  session: Session;
}

export default function InfoUserManage({ session }: IProps) {
  const [modifyUserDialogOpen, setModifyUserDialogOpen] =
    useState<boolean>(false);
  const [subUserMngDialogOpen, setSubUserMngDialogOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className={ms.bottom}>
        <div className={ms.inner}>
          {/* LEFT */}
          <p className={`${ms.left} ${ms.info_txt}`}>
            <BiSolidUserCircle size={22} role="img" aria-label="유저 아이콘" />
            <span>{session && session.user && session.user.id}</span>
          </p>

          {/* RIGHT */}
          <div className={`${ms.right} ${ms.btn_box}`}>
            <button
              className={ms.option_btn}
              title="서브캐릭터 관리"
              ref={ref}
              onClick={() => {
                setSubUserMngDialogOpen(true);
                setModifyUserDialogOpen(false);
              }}
            >
              <IoIosPeople size={22} role="img" aria-label="사람들 아이콘" />
            </button>
            <button
              className={`${ms.right} ${ms.option_btn}`}
              title="개인정보 수정"
              ref={ref}
              onClick={() => {
                setModifyUserDialogOpen(true);
                setSubUserMngDialogOpen(false);
              }}
            >
              <GrSettingsOption
                size={22}
                role="img"
                aria-label="톱니바퀴 아이콘"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 개인정보 관리 다이얼로그 */}
      <Dialog
        width="lg"
        open={modifyUserDialogOpen}
        setOpen={setModifyUserDialogOpen}
        title="개인정보 관리"
        ref={ref}
        paperHidden={true}
      >
        <InfoUserManageDialog
          session={session}
          setOpen={setModifyUserDialogOpen}
        />
      </Dialog>

      {/* 서브캐릭터 관리 다이얼로그 */}
      <Dialog
        width="lg"
        open={subUserMngDialogOpen}
        setOpen={setSubUserMngDialogOpen}
        title="서브캐릭터 관리"
        ref={ref}
        paperHidden={true}
      >
        <InfoSubUserManageDialog
          session={session}
          setOpen={setModifyUserDialogOpen}
        />
      </Dialog>
    </React.Fragment>
  );
}
