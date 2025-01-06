"use client";

import React, { forwardRef, useEffect, useId, useState, Ref } from "react";
import "./Selectbox.scss";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";
import { InputErrorMsgType } from "@/types/common/commonType";
import { InputLabel, withStyles } from "@mui/material";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
export interface SelectboxType {
  name: string;
  value: any;
  group: string;
}

interface SelectboxProps {
  items: SelectboxType[];
  size?: "xsm" | "sm" | "md" | "lg" | "xlg";
  color?: string;
  title: string;
  value?: string;
  effectivenessMsg?: InputErrorMsgType;
  partialErrorObj?: FieldValues;
  onChange: (event: SelectChangeEvent) => void;
  placeholder?: string;
}

const Selectbox = (
  {
    items,
    size,
    color,
    title,
    value,
    effectivenessMsg,
    partialErrorObj,
    placeholder,
    onChange,
    ...props
  }: SelectboxProps,
  ref: Ref<any>
) => {
  const id = useId();
  const [isMouseFocus, setIsMouseFocus] = useState<boolean>(false);

  // 커스텀 셀렉트 아이콘
  const iconStyles = {
    selectIcon: {
      color: "var(--gray-1000)",
    },
  };

  const baseSelectClassName = clsx({
    ["select"]: true,
    ["white"]: true,
    ["xsm"]: size === "xsm",
    ["sm"]: size === "sm",
    ["md"]:
      !size ||
      size === "md" ||
      (size !== "xsm" && size !== "sm" && size !== "lg" && size !== "xlg"),
    ["lg"]: size === "lg",
    ["xlg"]: size === "xlg",
    ["red"]:
      partialErrorObj || (effectivenessMsg && !effectivenessMsg.isSuccess),
    ["focus"]: isMouseFocus,
  });

  const [isMount, setIsMount] = useState<boolean>(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  const labelId = `${id}_${title}_label`;
  const selectId = `${id}_${title}`;

  const [open, setOpen] = useState<boolean>(false); // 드롭다운 열림 상태 관리
  return (
    <>
      {isMount ? (
        <FormControl
          className={`select_box`}
          onClick={() => setOpen((prev) => !prev)} // 클릭 시 드롭다운 여닫음
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setOpen((prev) => !prev); // 엔터 시 드롭다운 여닫음
            }

            if (
              (e.key === "ArrowUp" && !open) ||
              (e.key === "ArrowDown" && !open)
            ) {
              setOpen(true);
            }
          }}
          onFocus={() => {
            setIsMouseFocus(true);
          }}
          onBlur={() => {
            setIsMouseFocus(false);
          }}
        >
          <InputLabel htmlFor={labelId} className={`screen_out`}>
            {title}
          </InputLabel>
          <Select
            open={open} // open 상태 관리
            displayEmpty
            inputProps={{
              "aria-label": title,
              id: labelId,
              title: title,
            }}
            defaultValue={""}
            onChange={(event) => {
              onChange(event);
              setTimeout(() => {
                setOpen(false); // 선택 후 드롭다운 닫기
              }, 0);
            }}
            className={clsx(baseSelectClassName)}
            onMouseUp={() => {
              const addSizeClass = document.querySelector(
                ".MuiList-root.MuiMenu-list"
              );
              addSizeClass?.classList.add(size ? size : "md");
            }}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return placeholder;
              }

              return items.find((item) => item.value === selected)?.name;
            }}
            value={value}
            disabled={color === "disabled" ? true : false}
            MenuProps={{
              disableScrollLock: true,
            }}
            {...props}
          >
            {items.map((item: SelectboxType) => {
              return (
                <MenuItem key={`${id}_${item.value}`} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* react-hook-form error 객체: 실패일 때 에러메시지를 던져줌 */}
          {partialErrorObj && (
            <small role="alert" className="txt_error">
              <RiErrorWarningFill
                size={20}
                color="#D50136"
                role="img"
                aria-label="입력값 체크 아이콘(실패 - 느낌표)"
              />
              {partialErrorObj.message}
            </small>
          )}
          {/* 제어형 컴포넌트*/}
          {effectivenessMsg && (
            <>
              {!effectivenessMsg.isSuccess &&
              effectivenessMsg.msg &&
              effectivenessMsg.msg.length ? (
                <p className={"txt_error"}>
                  <RiErrorWarningFill
                    size={20}
                    color="#D50136"
                    role="img"
                    aria-label="입력값 체크 아이콘(실패 - 느낌표)"
                  />
                  {effectivenessMsg.msg}
                </p>
              ) : (
                <>
                  {effectivenessMsg.isSuccess &&
                  effectivenessMsg.msg &&
                  effectivenessMsg.msg.length ? (
                    <p className={"txt_success"}>
                      <RiCheckboxCircleFill
                        size={20}
                        role="img"
                        color="#006E18"
                        aria-label="입력값 체크 아이콘(성공)"
                      />
                      {effectivenessMsg.msg}
                    </p>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </FormControl>
      ) : (
        <></>
      )}
    </>
  );
};
export default forwardRef(Selectbox);
