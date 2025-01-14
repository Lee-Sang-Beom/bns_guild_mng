"use client";
import Button from "@/component/common/Button/Button";
import ms from "./Notice.module.scss";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import Dialog from "@/component/common/Dialog/Dialog";
import RegisterNoticeDialog from "./Dialog/RegisterNoticeDialog";

interface IProps {
  session: Session;
}
export default function NoticeTop({ session }: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      {/* 공지사항 등록 TOP 영역 */}
      <div className={ms.top}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"분배정보 등록"}
            id={"reg_notice_btn"}
            size="md"
            ref={ref}
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            공지사항 등록
          </Button>
        </div>
      </div>

      {/* 공지사항 등록 */}
      <Dialog
        width="lg"
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="공지사항 등록"
        ref={ref}
        paperHidden={true}
      >
        <RegisterNoticeDialog session={session} setOpen={setDialogOpen} />
      </Dialog>
    </React.Fragment>
  );
}
