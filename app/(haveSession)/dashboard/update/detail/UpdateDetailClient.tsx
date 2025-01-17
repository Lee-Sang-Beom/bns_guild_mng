"use client";

import ms from "./UpdateDetail.module.scss";
import TableDetail from "@/component/common/TableDetail/TableDetail";
import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import Button from "@/component/common/Button/Button";
import Dialog from "@/component/common/Dialog/Dialog";
import { useRouter } from "next/navigation";
import { homepageAdminUserId } from "@/datastore/common/common";
import { UpdateResponse } from "@/types/haveSession/dashboard/update/response";
import ModifyUpdateDialog from "../Dialog/ModifyUpdateDialog";
interface IProps {
  data: UpdateResponse;
  session: Session;
}
export default function UpdateDetailClient({ session, data }: IProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectNotice, setSelectNotice] = useState<UpdateResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const ref = useRef<HTMLButtonElement | null>(null);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const isAdmin = session.user.id === homepageAdminUserId;
    setIsAdmin(isAdmin ? true : false);
  }, [session]);

  return (
    <div className={ms.wrap}>
      {/* 업데이트 공지사항 수정 */}
      {selectNotice && (
        <Dialog
          width="lg"
          open={dialogOpen}
          setOpen={setDialogOpen}
          title="업데이트 공지사항 수정"
          ref={ref}
          paperHidden={true}
        >
          <ModifyUpdateDialog
            session={session}
            setOpen={setDialogOpen}
            data={selectNotice}
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
          {isAdmin ? (
            <Button
              color={"blue_reverse"}
              title={"수정"}
              id={"modifiy"}
              onClick={(e) => {
                setSelectNotice(data);
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
              router.push("/dashboard/update");
            }}
          >
            목록으로
          </Button>
        </div>
      </TableDetail>
    </div>
  );
}
