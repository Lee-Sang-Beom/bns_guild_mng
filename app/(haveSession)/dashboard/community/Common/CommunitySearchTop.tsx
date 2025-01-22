"use client";
import Button from "@/component/common/Button/Button";
import ms from "../Community.module.scss";
import React, { useRef, useState } from "react";
import { Session } from "next-auth";
import Dialog from "@/component/common/Dialog/Dialog";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { adminAuthTypes } from "@/datastore/common/common";
import {
  CommunityRequest,
  CommunityType,
} from "@/types/haveSession/dashboard/community/request";
import RegisterCommunityDialog from "./RegisterCommunityDialog";
interface IProps {
  session: Session;
  queryInstance: CommunityRequest;
}
export default function CommunitySearchTop({ session, queryInstance }: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogDocType, setDialogDocType] = useState<CommunityType>("ARTWORK");

  const ref = useRef<HTMLButtonElement | null>(null);
  const { setText, setStatus, setIsChange } = useAutoAlert();

  return (
    <React.Fragment>
      {/* 커뮤니티 등록 TOP 영역 */}
      <div className={ms.top}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"커뮤니티 등록"}
            id={"reg_community_btn"}
            size="md"
            ref={ref}
            onClick={() => {
              const docType = queryInstance.searchType as CommunityType;
              setDialogDocType(docType);
              setDialogOpen(true);
            }}
          >
            등록
          </Button>
        </div>
      </div>

      {/* 커뮤니티 등록 */}
      <Dialog
        width="lg"
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="커뮤니티 등록"
        ref={ref}
        paperHidden={true}
      >
        <RegisterCommunityDialog
          docType={dialogDocType}
          session={session}
          setOpen={setDialogOpen}
        />
      </Dialog>
    </React.Fragment>
  );
}
