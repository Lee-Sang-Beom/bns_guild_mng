"use client";
import Button from "@/component/common/Button/Button";
import ms from "./CashShare.module.scss";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import Dialog from "@/component/common/Dialog/Dialog";
import DistributionInfomationRegistrationDialog from "./DistributionInfomationRegistrationDialog";

interface IProps {
  session: Session;
}
export default function CashShareTop({ session }: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      {/* 분배정보 등록 TOP 영역 */}
      <div className={ms.top}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"분배정보 등록"}
            id={"distribution_information_registration"}
            size="md"
            ref={ref}
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            분배정보 등록
          </Button>
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
        <DistributionInfomationRegistrationDialog
          session={session}
          setOpen={setDialogOpen}
        />
      </Dialog>
    </React.Fragment>
  );
}
