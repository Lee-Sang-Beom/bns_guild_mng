"use client";

import Chip from "@/component/common/Chip/Chip";
import PagingComponent from "@/component/common/Paging/Paging";
import Table, { TableHeader } from "@/component/common/Table/Table";
import { TablePageResponse } from "@/types/common/commonType";
import { CashshareRequest } from "@/types/haveSession/dashboard/cashshare/request";
import { makeUrlQuery } from "@/utils/common/common";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import tms from "@/styles/tableHeader.module.scss";
import Button from "@/component/common/Button/Button";
import { useEffect, useRef, useState } from "react";
import Dialog from "@/component/common/Dialog/Dialog";
import DistributionInfomationModifyDialog from "./Dialog/DistributionInfomationModifyDialog";
import { deleteCollectionCashShare } from "@/utils/haveSession/dashboard/cashshare/action";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import clsx from "clsx";
import { CashshareResponse } from "@/types/haveSession/dashboard/cashshare/response";
import Loading from "@/component/common/Loading/Loading";
import ms from "./CashShare.module.scss";

interface IProps {
  session: Session;
  queryInstance: CashshareRequest;
  tableResponse: TablePageResponse<CashshareResponse[]>;
}
export default function CashShareBottom({
  session,
  queryInstance,
  tableResponse,
}: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();
  const [selectCashshare, setSelectCashshare] =
    useState<CashshareResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가

  const tableHeader: TableHeader[] = [
    {
      name: "단계",
      value: "step",
      accessFn: (item: CashshareResponse, idx: number) => {
        const step = item.step;
        const stepValue =
          step === "TRANSACTION_REGISTRATION"
            ? "거래등록"
            : step === "TRANSACTION_COMPLETED"
            ? "거래완료"
            : "분배완료";

        const borderClsx = clsx({
          [tms.table_header_text]: true,
          [tms.red]: stepValue == "거래등록",
          [tms.blue]: stepValue == "거래완료",
          [tms.gray]: stepValue == "분배완료",
        });
        return (
          <p className={borderClsx} key={`${item.docId}_step`}>
            {stepValue}
          </p>
        );
      },
      width: "5%",
    },
    {
      name: "대표 판매자",
      value: "sellerId",
      width: "10%",
    },
    {
      name: "파티원 목록",
      value: "distributionUserList",
      width: "15%",
      accessFn: (item: CashshareResponse, idx: number) => {
        return (
          <div
            className={`${tms.table_header_flex} ${tms.table_header_flexwrap}`}
            key={`${item.docId}_distributionUserList`}
          >
            {item.distributionUserList.map((user) => {
              return (
                <Chip
                  widthStyle="fit-content"
                  chipData={{
                    name: user,
                    value: user,
                    group: "",
                  }}
                  color={user === session.user.id ? "blue" : "white"}
                  title={`${item.docId}_distributionUserList_${user}`}
                  key={`${item.docId}_distributionUserList_${user}`}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      name: "판매 물품",
      value: "itemList",
      width: "15%",
      accessFn: (item: CashshareResponse, idx: number) => {
        return (
          <div
            className={`${tms.table_header_flex} ${tms.table_header_flexwrap}`}
            key={`${item.docId}_itemList`}
          >
            {item.itemList.map((itemName) => {
              return (
                <Chip
                  widthStyle="fit-content"
                  chipData={{
                    name: itemName,
                    value: itemName,
                    group: "",
                  }}
                  color={"white"}
                  title={`${item.docId}_itemList_${itemName}`}
                  key={`${item.docId}_itemList_${itemName}`}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      name: "판매 수익금",
      value: "totalPrice",
      width: "15%",
      accessFn: (item: CashshareResponse, idx: number) => {
        const step = item.step;
        const stepValue =
          step === "TRANSACTION_REGISTRATION"
            ? "거래등록"
            : step === "TRANSACTION_COMPLETED"
            ? "거래완료"
            : "분배완료";

        return (
          <>
            {stepValue != "거래등록" ? (
              <p
                className={tms.table_header_text}
                key={`${item.docId}_totalPrice`}
              >
                {`${item.totalPrice.toLocaleString()}금`}
              </p>
            ) : (
              <p
                className={tms.table_header_text}
                key={`${item.docId}_totalPrice`}
              >
                미판매
              </p>
            )}
          </>
        );
      },
    },
    {
      name: "인당 분배금",
      value: "distributionPrice",
      width: "15%",

      accessFn: (item: CashshareResponse, idx: number) => {
        const step = item.step;
        const stepValue =
          step === "TRANSACTION_REGISTRATION"
            ? "거래등록"
            : step === "TRANSACTION_COMPLETED"
            ? "거래완료"
            : "분배완료";

        return (
          <>
            {stepValue != "거래등록" ? (
              <p className={tms.table_header_text}>{item.distributionPrice}</p>
            ) : (
              <p className={tms.table_header_text}>미판매</p>
            )}
          </>
        );
      },
    },
    {
      name: "등록 일시",
      value: "regDt",
      width: "10%",
      accessFn: (item: CashshareResponse, idx: number) => {
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
      accessFn: (item: CashshareResponse, idx: number) => {
        return (
          <div className={`${tms.table_header_flex}`} key={`${item.docId}_mng`}>
            {item.sellerId === session.user.id ? (
              <>
                <div className={tms.btn_box}>
                  <Button
                    color={"blue_reverse"}
                    title={"수정"}
                    id={"modifiy"}
                    onClick={(e) => {
                      setSelectCashshare(item);
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
                      const res = await deleteCollectionCashShare(item.docId);
                      if (res.success) {
                        setText("삭제되었습니다.");
                        setIsChange(true);
                        setStatus("success");

                        setTimeout(() => {
                          router.replace(
                            `/dashboard/cashshare?${makeUrlQuery({
                              ...queryInstance,
                              page: 1,
                            })}`
                          );
                          router.refresh();
                        }, 500);
                      } else {
                        setText(
                          res.message ||
                            "분배 정보 삭제 중 오류가 발생했습니다."
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

  // 🚀 데이터를 받아오면 로딩 상태 해제
  useEffect(() => {
    setIsLoading(false);
  }, [tableResponse]);

  return (
    <>
      <Loading text="요청한 데이터를 불러오고 있습니다..." open={isLoading} />

      <div className={ms.bottom}>
        <div className={ms.inner}>
          {/* 분배 정보 수정 */}
          {selectCashshare && (
            <Dialog
              width="lg"
              open={dialogOpen}
              setOpen={setDialogOpen}
              title="분배 정보 등록"
              ref={ref}
              paperHidden={true}
            >
              <DistributionInfomationModifyDialog
                session={session}
                setOpen={setDialogOpen}
                data={selectCashshare}
              />
            </Dialog>
          )}
          <Table<CashshareResponse>
            data={
              tableResponse && tableResponse.content
                ? tableResponse.content
                : []
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
              setIsLoading(true);
              const newQueryString: CashshareRequest = {
                ...queryInstance,
                size: queryInstance.size, // 기존 size 유지
                page: page, // 클릭된 페이지
              };

              // 쿼리스트링에 lastDoc을 포함하여 URL 업데이트
              router.replace(
                `/dashboard/cashshare?${makeUrlQuery(newQueryString)}`
              );
              router.refresh();
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
      </div>
    </>
  );
}
