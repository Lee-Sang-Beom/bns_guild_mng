"use client";

import "./Dialog.scss";
import React, {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  useEffect,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../Button/Button";
import { IoClose } from "react-icons/io5";

interface DialogCompProps {
  type?: "alert";
  width?: "xs" | "sm" | "lg" | "xl";
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode | React.ReactNode[];
  bottomBtn?: React.ReactNode | React.ReactNode[];
  closeBtnHover?: boolean;
  paperHidden?: boolean;
}

/**
 *
 * @param type?: 팝업 타입 (기본 다이얼로그)
 * @returns "alert";
 *
 * @param bottomBtn?:팝업 하단 버튼  (자동 고정됨)
 * @returns
 *
 * @param closeBtnHover?: 다이얼로그 닫기 버튼 호버 여부
 *
 * @param paperHidden?
 * @description 다이얼로그 내부 contents 영역은 overflow: hidden을 해도 다이얼로그 자체에서 늘어난 너비를 인식하는 것으로 보인다.
 * @description 만약 이 때문에 원하지 않는 스크롤이 생기면, 이 props를 true로 주면 된다.
 */

const DialogComp = (
  {
    type,
    width,
    open,
    setOpen,
    title,
    children,
    bottomBtn,
    closeBtnHover,
    paperHidden,
  }: DialogCompProps,
  ref: React.Ref<HTMLButtonElement | null>
) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    /**
     * document.documentElement는 HTML 문서의 최상위 요소인 <html> 요소를 나타내는 DOM 객체입니다. 브라우저의 HTML 구조에서 최상위에 위치하는 이 <html> 요소를 통해 웹 페이지 전체의 스타일, 레이아웃, 스크롤 등을 제어할 수 있습니다.
     *
     * 페이지 전체 스타일 조작: document.documentElement를 사용하면 <html> 요소에 스타일을 직접 적용할 수 있습니다. 예를 들어 overflow 속성을 설정하여 페이지 전체의 스크롤 동작을 제어할 수 있습니다.
     */
    if (open) {
      // 팝업이 열릴 때 스크롤은 비활성화하되 스크롤바는 유지
      document.documentElement.style.overflow = "hidden";
    } else {
      // 팝업이 닫힐 때 원래 상태로 복구
      document.documentElement.style.overflow = "";
    }

    // 컴포넌트 언마운트 시 초기화
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={(e: any) => {
        setOpen(false);

        //@ts-ignore
        if (ref && ref.current) {
          //@ts-ignore
          ref.current.focus();
        }
      }}
      scroll={"paper"}
      aria-labelledby={`scroll-dialog-${title}`}
      aria-describedby="scroll-dialog-description"
      maxWidth={width ? width : "md"}
      fullWidth={true}
      className={`${type === "alert" ? "type_alert" : ""}`}
      classes={{
        root: paperHidden ? "hidden" : "",
      }}
      disableScrollLock
    >
      <DialogTitle id={`scroll-dialog-${title}`}>
        <p>{title}</p>
        <div className={`btn_close ${closeBtnHover === false ? "" : "hover"}`}>
          <Button
            title={"다이얼로그 닫기"}
            id={"dialogClose"}
            size="sm"
            color="none"
            onClick={() => {
              setOpen(false);

              //@ts-ignore
              if (ref && ref.current) {
                //@ts-ignore
                ref.current.focus();
              }
            }}
          >
            <IoClose role="img" aria-label="닫기" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>{children}</DialogContent>
      <DialogActions>{bottomBtn}</DialogActions>
    </Dialog>
  );
};

export default forwardRef(DialogComp);
