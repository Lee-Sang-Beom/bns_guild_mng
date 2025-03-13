import React, { Ref, useId } from "react";
import style from "./Textarea.module.scss";
import clsx from "clsx";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { FieldValues } from "react-hook-form";
import { InputErrorMsgType } from "@/types/common/commonType";

interface TextareaProps {
  taSize?: "xsm" | "sm" | "md" | "lg" | "xlg";
  title: string;
  value?: string | number;
  onChange?: (e: any) => void;
  defaultMultiLine?: boolean;
  partialErrorObj?: FieldValues;
  effectivenessMsg?: InputErrorMsgType;
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & React.HTMLProps<HTMLTextAreaElement>
>(
  (
    {
      taSize,
      title,
      value,
      onChange,
      defaultMultiLine,
      partialErrorObj,
      effectivenessMsg,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const baseTextAreaClassName = clsx({
      [style.textarea]: true,
      [style.white]: true,
      [style.xsm]: taSize === "xsm",
      [style.sm]: taSize === "sm",
      [style.md]: taSize === "md",
      [style.lg]:
        !taSize ||
        taSize === "lg" ||
        (taSize !== "xsm" &&
          taSize !== "sm" &&
          taSize !== "md" &&
          taSize !== "xlg"),
      [style.xlg]: taSize === "xlg",
    });

    return (
      <>
        <label htmlFor={`${id}_${title}`} className="screen_out">
          {title}
        </label>
        <textarea
          id={`${id}_${title}`}
          title={title}
          className={clsx(baseTextAreaClassName)}
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
          }}
          ref={ref}
          {...props}
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
            {!effectivenessMsg.isSuccess && effectivenessMsg.msg?.length ? (
              <p className={style.txt_error}>
                <RiErrorWarningFill
                  size={20}
                  color="#D50136"
                  role="img"
                  aria-label="입력값 체크 아이콘(실패 - 느낌표)"
                />
                {effectivenessMsg.msg}
              </p>
            ) : effectivenessMsg.isSuccess && effectivenessMsg.msg?.length ? (
              <p className={style.txt_success}>
                <RiCheckboxCircleFill
                  size={20}
                  color="#006E18"
                  role="img"
                  aria-label="입력값 체크 아이콘(성공)"
                />
                {effectivenessMsg.msg}
              </p>
            ) : null}
          </>
        )}
      </>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
