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
import { deleteCollectionUpdate } from "@/utils/haveSession/dashboard/update/action";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
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
  const { setIsChange, setStatus, setText } = useAutoAlert();

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
            <>
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
              <Button
                color={"red_reverse"}
                title={"삭제"}
                id={"remove"}
                onClick={async (e) => {
                  const res = await deleteCollectionUpdate(data.docId);
                  if (res.success) {
                    setText("삭제되었습니다.");
                    setIsChange(true);
                    setStatus("success");
                    setTimeout(() => {
                      router.replace("/dashboard/update");
                      router.refresh();
                    }, 500);
                  } else {
                    setText(
                      res.message ||
                        "업데이트 공지사항 삭제 중 오류가 발생했습니다."
                    );
                    setIsChange(true);
                    setStatus("error");
                  }
                }}
              >
                삭제
              </Button>
            </>
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
