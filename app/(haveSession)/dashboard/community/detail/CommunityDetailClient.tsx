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
import { deleteCollectionCommunity } from "@/utils/haveSession/dashboard/community/action";
import { makeUrlQuery } from "@/utils/common/common";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";

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

  const { setText, setStatus, setIsChange } = useAutoAlert();
  const newQueryInstance = {
    page: 1,
    size: 5,
    sort: "regDt",
    orderBy: "desc",
    searchType: data.docType,
    searchKeyWord: "",
  };
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
            <>
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
              <Button
                color={"red_reverse"}
                title={"삭제"}
                id={"remove"}
                onClick={async (e) => {
                  const res = await deleteCollectionCommunity(data.docId);
                  if (res.success) {
                    setText("삭제되었습니다.");
                    setIsChange(true);
                    setStatus("success");
                    setTimeout(() => {
                      router.replace(
                        `/dashboard/community?${makeUrlQuery(newQueryInstance)}`
                      );
                      router.refresh();
                    }, 500);
                  } else {
                    setText(
                      res.message || "커뮤니티 삭제 중 오류가 발생했습니다."
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
              router.replace(
                `/dashboard/community?${makeUrlQuery(newQueryInstance)}`
              );
              router.refresh();
            }}
          >
            목록으로
          </Button>
        </div>
      </TableDetail>
    </div>
  );
}
