"use client";

import React, {
  Ref,
  forwardRef,
  useEffect,
  useId,
  useState,
  useRef,
} from "react";
import style from "./Checkbox.module.scss";
import { FieldValues } from "react-hook-form";

interface CheckboxProps {
  color?: string;
  border?: "br_square_round_1" | "br_square_round_2" | "br_round";
  title: string;
  value?: string | number;
  partialErrorObj?: FieldValues;
}

/**
 *
 * @param color?: 인풋 색상 (기본 blue)
 * @returns string (blue, disabled)
 *
 * @param border?: 보더 사이즈 (기본 0)
 * @return "br_square_round_1" | "br_square_round_2" | "br_round";
 *
 * @param value?: 인풋 value // react-hook-form을 사용하면 안보내도 됨
 * @returns string | number
 *
 * @param title: input title로, 한 페이지 내에서 겹치지 않는 input 대상명을 정확히 보내주어야 함
 * @returns string
 *
 * @partialErrorObj : react-hook-form error obj
 */

const Checkbox = (
  {
    color,
    title,
    border,
    value,
    partialErrorObj,
    ...props
  }: CheckboxProps & React.HTMLProps<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) => {
  const id = useId();
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const checkbox = checkboxRef.current;
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change", { bubbles: false })); // 강제로 change 이벤트를 수동으로 트리거 (checkbox.checked 속성 직접 변경 시, change 이벤트가 발생하지 않기 때문)
      }
    }
  };

  return (
    <div className={style.check_box}>
      <label htmlFor={`${id}_${title}`} className="screen_out">
        {title}
      </label>
      <input
        type="checkbox"
        id={`${id}_${title}`}
        title={title}
        className={`${style.checkbox}  ${
          color && color !== "" ? style[color] : style.blue
        } ${border ? style[border] : ""}
        ${partialErrorObj ? style.red : ""}`}
        disabled={color === "disabled" ? true : false}
        value={value}
        ref={checkboxRef}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Checkbox);
