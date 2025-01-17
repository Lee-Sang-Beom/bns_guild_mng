"use client";
import Button from "@/component/common/Button/Button";
import ms from "./Update.module.scss";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import Dialog from "@/component/common/Dialog/Dialog";

import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { homepageAdminUserId } from "@/datastore/common/common";
import RegisterUpdateDialog from "./Dialog/RegisterUpdateDialog";
interface IProps {
  session: Session;
}
export default function UpdateTop({ session }: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const { setText, setStatus, setIsChange } = useAutoAlert();

  return (
    <React.Fragment>
      {/* 버전 업데이트 공지사항 등록 TOP 영역 */}
      <div className={ms.top}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"버전 업데이트 공지사항 등록"}
            id={"reg_update_btn"}
            size="md"
            ref={ref}
            onClick={() => {
              const isAdmin = session.user.id === homepageAdminUserId;
              if (isAdmin) {
                setDialogOpen(true);
              } else {
                setText(
                  "홈페이지 관리자가 아닌 사람은 공지사항을 작성할 수 없습니다."
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
        <RegisterUpdateDialog session={session} setOpen={setDialogOpen} />
      </Dialog>
    </React.Fragment>
  );
}
