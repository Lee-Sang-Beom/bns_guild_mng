"use client";
import Button from "@/component/common/Button/Button";
import ms from "./CashShare.module.scss";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import Dialog from "@/component/common/Dialog/Dialog";
import DistributionInfomationRegistrationDialog from "./Dialog/DistributionInfomationRegistrationDialog";

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

      {/* 분배 정보 등록 */}
      <Dialog
        width="lg"
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="분배 정보 등록"
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
