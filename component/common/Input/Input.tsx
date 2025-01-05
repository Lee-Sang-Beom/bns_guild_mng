"use client";

import React, { Ref, forwardRef, useEffect, useId, useState } from "react";
import style from "./Input.module.scss";
import { FieldErrors, FieldValues } from "react-hook-form";
import { InputErrorMsgType } from "@/types/common/commonType";
import clsx from "clsx";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
} from "react-icons/ri";

interface InputProps {
  inpSize?: "xsm" | "sm" | "md" | "lg" | "xlg";
  title: string;
  disabled?: boolean;
  value: string | number;
  partialErrorObj?: FieldValues;
  effectivenessMsg?: InputErrorMsgType;
}

const Input = (
  {
    inpSize,
    title,
    disabled,
    value,
    partialErrorObj,
    effectivenessMsg,
    ...props
  }: InputProps & React.HTMLProps<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) => {
  const id = useId();

  const baseInputClassName = clsx({
    [style.inp]: true,
    [style.white]: true,
    [style.xsm]: inpSize === "xsm",
    [style.sm]: inpSize === "sm",
    [style.md]: inpSize === "md",
    [style.lg]:
      !inpSize ||
      inpSize === "lg" ||
      (inpSize !== "xsm" &&
        inpSize !== "sm" &&
        inpSize !== "md" &&
        inpSize !== "xlg"),
    [style.xlg]: inpSize === "xlg",
  });

  const inputId = `${id}_${title}`;

  return (
    <div className={style.inp_box}>
      <label htmlFor={inputId} className="screen_out">
        {title}
      </label>
      <input
        className={clsx(baseInputClassName)}
        disabled={disabled || false}
        value={value}
        ref={ref}
        {...props}
        id={inputId}
        title={title}
      />
      {/* react-hook-form (비제어형 컴포넌트) 에러메시지 */}
      {partialErrorObj && (
        <small role="alert" className={style.txt_error}>
          <RiErrorWarningFill
            size={20}
            color="#D50136"
            role="img"
            aria-label="입력값 체크 아이콘(실패 - 느낌표)"
          />
          {partialErrorObj.message}
        </small>
      )}
      {/* 제어형 컴포넌트 성공/에러메시지 */}
      {effectivenessMsg && (
        <>
          {!effectivenessMsg.isSuccess &&
          effectivenessMsg.msg &&
          effectivenessMsg.msg.length ? (
            <p className={style.txt_error}>
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
                <p className={style.txt_success}>
                  <RiCheckboxCircleFill
                    size={20}
                    color="#006E18"
                    role="img"
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
    </div>
  );
};

export default forwardRef(Input);
