"use client";

import ms from "./NoticeDetail.module.scss";
import TableDetail from "@/component/common/TableDetail/TableDetail";
import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import Button from "@/component/common/Button/Button";
import Dialog from "@/component/common/Dialog/Dialog";
import ModifyNoticeDialog from "../Dialog/ModifyNoticeDialog";
import { useRouter } from "next/navigation";
import { adminAuthTypes } from "@/datastore/common/common";
import { NoticeResponse } from "@/types/haveSession/dashboard/notice/response";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { deleteCollectionNotice } from "@/utils/haveSession/dashboard/notice/action";
interface IProps {
  data: NoticeResponse;
  session: Session;
}
export default function NoticeDetailClient({ session, data }: IProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectNotice, setSelectNotice] = useState<NoticeResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const ref = useRef<HTMLButtonElement | null>(null);
  const { setIsChange, setStatus, setText } = useAutoAlert();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loginUserAuthType = session.user.authType;
    const findIsAdmin = adminAuthTypes.find(
      (auth) => auth === loginUserAuthType
    );
    setIsAdmin(findIsAdmin ? true : false);
  }, [session]);

  return (
    <div className={ms.wrap}>
      {/* 공지사항 수정 */}
      {selectNotice && (
        <Dialog
          width="lg"
          open={dialogOpen}
          setOpen={setDialogOpen}
          title="공지사항 수정"
          ref={ref}
          paperHidden={true}
        >
          <ModifyNoticeDialog
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
                  const res = await deleteCollectionNotice(data.docId);
                  if (res.success) {
                    setText("삭제되었습니다.");
                    setIsChange(true);
                    setStatus("success");
                    setTimeout(() => {
                      router.replace("/dashboard/notice");
                      router.refresh();
                    }, 500);
                  } else {
                    setText(
                      res.message || "공지사항 삭제 중 오류가 발생했습니다."
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
              router.push("/dashboard/notice");
            }}
          >
            목록으로
          </Button>
        </div>
      </TableDetail>
    </div>
  );
}
