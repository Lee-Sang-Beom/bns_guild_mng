"use client";

import PagingComponent from "@/component/common/Paging/Paging";
import Table, { TableHeader } from "@/component/common/Table/Table";
import { TablePageResponse } from "@/types/common/commonType";
import { makeUrlQuery } from "@/utils/common/common";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import tms from "@/styles/tableHeader.module.scss";
import Button from "@/component/common/Button/Button";
import { useRef, useState } from "react";
import Dialog from "@/component/common/Dialog/Dialog";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import Link from "next/link";
import { homepageAdminUserId } from "@/datastore/common/common";
import { UpdateResponse } from "@/types/haveSession/dashboard/update/response";
import { UpdateRequest } from "@/types/haveSession/dashboard/update/request";
import ModifyUpdateDialog from "./Dialog/ModifyUpdateDialog";
import { deleteCollectionUpdate } from "@/utils/haveSession/dashboard/update/action";

interface IProps {
  session: Session;
  queryInstance: UpdateRequest;
  tableResponse: TablePageResponse<UpdateResponse[]>;
}
export default function UpdateBottom({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();
  const [selectNotice, setSelectNotice] = useState<UpdateResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const tableHeader: TableHeader[] = [
    {
      name: "제목",
      value: "title",
      width: "40%",
      accessFn: (item: UpdateResponse, idx: number) => {
        return (
          <Link
            className={`${tms.table_header_flex}`}
            key={`${item.docId}_title`}
            title={`${item.title} 상세 보기 페이지 이동`}
            href={`/dashboard/update/detail?doc=${item.docId}`}
          >
            {item.title}
          </Link>
        );
      },
    },
    {
      name: "작성자",
      value: "writerId",
      width: "20%",
    },
    {
      name: "등록일",
      value: "regDt",
      width: "20%",
      accessFn: (item: UpdateResponse, idx: number) => {
        // regDt가 Timestamp 객체라면 Date로 변환 후 포맷
        const timestamp = item.regDt; // Firebase Timestamp 객체
        if (timestamp && timestamp.seconds) {
          const date = new Date(timestamp.seconds * 1000); // 초 단위로 변환
          return <p key={`${item.docId}_regDt`}>{date.toLocaleString()}</p>; // 로컬 시간 포맷으로 출력
        }
        return <p key={`${item.docId}_regDt_등록일 없음`}>등록일 없음</p>;
      },
    },
    {
      name: "관리",
      value: "docId",
      width: "20%",
      accessFn: (item: UpdateResponse, idx: number) => {
        const isAdmin = session.user.id === homepageAdminUserId;

        return (
          <div className={`${tms.table_header_flex}`} key={`${item.docId}_mng`}>
            {isAdmin ? (
              <>
                <div className={tms.btn_box}>
                  <Button
                    color={"blue_reverse"}
                    title={"수정"}
                    id={"modifiy"}
                    onClick={(e) => {
                      setSelectNotice(item);
                      setDialogOpen(true);
                    }}
                  >
                    수정
                  </Button>
                </div>
                <div className={tms.btn_box}>
                  <Button
                    color={"red_reverse"}
                    title={"삭제"}
                    id={"remove"}
                    onClick={async (e) => {
                      const res = await deleteCollectionUpdate(item.docId);
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
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
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
      <Table<UpdateResponse>
        data={
          tableResponse && tableResponse.content ? tableResponse.content : []
        }
        headers={tableHeader}
        tableType={"vertical"}
        tableCaption={""}
        itemTitle={""}
        ref={null}
        trHover
      />
      <PagingComponent
        onClickEvent={(page: number) => {
          const newQueryString: UpdateRequest = {
            ...queryInstance,
            size: queryInstance.size, // 기존 size 유지
            page: page, // 클릭된 페이지
          };

          // 쿼리스트링에 lastDoc을 포함하여 URL 업데이트
          router.replace(`/dashboard/update?${makeUrlQuery(newQueryString)}`);
        }}
        pagingData={{
          first: tableResponse?.first ?? false,
          last: tableResponse?.last ?? false,
          size: tableResponse?.size ?? 10,
          totalPages: tableResponse?.totalPages ?? 1,
          totalElements: tableResponse?.totalElements ?? 0,
          number: tableResponse?.number ?? 0,
        }}
      />
    </div>
  );
}
