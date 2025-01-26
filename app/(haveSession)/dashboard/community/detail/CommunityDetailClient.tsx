"use client";

import ms from "./CommunityDetailClient.module.scss";
import TableDetail from "@/component/common/TableDetail/TableDetail";
import { useRef, useState } from "react";
import { Session } from "next-auth";
import Button from "@/component/common/Button/Button";
import Dialog from "@/component/common/Dialog/Dialog";

import { useRouter } from "next/navigation";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import ModifyCommunityDialog from "../Common/ModifyCommunityDialog";

interface IProps {
  data: CommunityResponse;
  session: Session;
}
export default function CommunityDetailClient({ session, data }: IProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectCommunity, setSelectCommunity] =
    useState<CommunityResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={ms.wrap}>
      {/* 커뮤니티 수정 */}
      {selectCommunity && (
        <Dialog
          width="lg"
          open={dialogOpen}
          setOpen={setDialogOpen}
          title="커뮤니티 수정"
          ref={ref}
          paperHidden={true}
        >
          <ModifyCommunityDialog
            session={session}
            setOpen={setDialogOpen}
            data={selectCommunity}
          />
        </Dialog>
      )}

      <TableDetail
        ref={tableRef}
        title={data.title}
        content={data.content}
        writerId={data.writerId}
      >
        <div className={ms.btn_box}>
          {session.user.id === data.writerId ? (
            <Button
              color={"blue_reverse"}
              title={"수정"}
              id={"modifiy"}
              onClick={(e) => {
                setSelectCommunity(data);
                setDialogOpen(true);
              }}
            >
              수정
            </Button>
          ) : (
            <></>
          )}
          <Button
            color={"white"}
            title={"목록으로"}
            id={"move_list_page"}
            onClick={() => {
              router.push("/dashboard/community");
            }}
          >
            목록으로
          </Button>
        </div>
      </TableDetail>
    </div>
  );
}
