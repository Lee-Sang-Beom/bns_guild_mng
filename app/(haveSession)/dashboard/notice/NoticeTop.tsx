"use client";
import Button from "@/component/common/Button/Button";
import ms from "./Notice.module.scss";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import Dialog from "@/component/common/Dialog/Dialog";
import RegisterNoticeDialog from "./Dialog/RegisterNoticeDialog";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { adminAuthTypes } from "@/datastore/common/common";
interface IProps {
  session: Session;
}
export default function NoticeTop({ session }: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const { setText, setStatus, setIsChange } = useAutoAlert();

  return (
    <React.Fragment>
      {/* 공지사항 등록 TOP 영역 */}
      <div className={ms.top}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"공지사항 등록"}
            id={"reg_notice_btn"}
            size="md"
            ref={ref}
            onClick={() => {
              const loginUserAuthType = session.user.authType;
              const isAdmin = adminAuthTypes.find(
                (auth) => auth === loginUserAuthType
              );

              // adminAuthTypes에 loginUserAuthType이 포함되어 있는지 확인
              if (isAdmin) {
                setDialogOpen(true);
              } else {
                setText(
                  "문파 관리자가 아닌 사람은 공지사항을 작성할 수 없습니다."
                );
                setIsChange(true);
                setStatus("warning");
              }
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
