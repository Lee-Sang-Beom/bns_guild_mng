"use client";

import { BiSolidUserCircle } from "react-icons/bi";
import ms from "../Header.module.scss";
import { Session } from "next-auth";
import { GrSettingsOption } from "react-icons/gr";
import React, { useRef, useState } from "react";
import Dialog from "@/component/common/Dialog/Dialog";
import InfoUserManageDialog from "./InfoUserManageDialog";

interface IProps {
  session: Session;
}

export default function InfoUserManage({ session }: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className={ms.bottom}>
        <div className={ms.inner}>
          {/* LEFT */}
          <p className={`${ms.left} ${ms.info_txt}`}>
            <BiSolidUserCircle size={22} role="img" aria-label="유저 아이콘" />
            {session && session.user && session.user.id}
          </p>

          {/* RIGHT */}
          <button
            className={`${ms.right} ${ms.option_btn}`}
            title="개인정보 수정"
            ref={ref}
            onClick={() => {
              setDialogOpen(true);
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

      {/* 개인정보 관리 다이얼로그 */}
      <Dialog
        width="lg"
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="개인정보 관리"
        ref={ref}
        paperHidden={true}
      >
        <InfoUserManageDialog session={session} setOpen={setDialogOpen} />
      </Dialog>
    </React.Fragment>
  );
}
