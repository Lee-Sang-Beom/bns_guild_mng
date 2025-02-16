"use client";

import React, { useState } from "react";
import style from "./Chip.module.scss";
import clsx from "clsx";

export interface ChipType {
  name: string;
  value: string | number;
  group: string;
}
interface ChipProps {
  widthStyle?: "parent-content" | "fit-content";
  chipData: ChipType;
  chipClick?: (chipData: ChipType) => void;
  chipSize?: "xsm" | "sm" | "md" | "lg" | "xlg";
  color?: "white" | "blue" | "disabled";
  border?: "br_square_round_1" | "br_square_round_2" | "br_round";
  title: string;
}

/**
 * @param widthStyle: 칩 너비 스타일
 * @return "parent-content" "fit-content"
 *
 * @description fit-content: 내부 컨텐츠 너비만큼만 width 구성 (default)
 * @description parent-content: 부모 너비만큼 width 구성
 *
 *
 * @param chipData: 칩 내용
 * @return {name: string; value: string | number; group: string;}
 *
 * @description 클릭한 이유가 chip 자체인지, closeButton과 element에 대한 이벤트인지 구분
 * @description 이는 의도치않은 버블링 분리를 위함
 * @description 추가적으로, chipClickTarget을 "button"으로 전달하면, 삭제를 위한 closeButton이 세팅됨
 *
 * @param chipClick?: 칩 클릭
 * @return (chipData: ChipType)=>void;
 *
 * @param chipSize?: 칩 크기 (기본 sm : 스타일가이드)
 * @return "xsm" | "sm" | "md" | "lg" | "xlg";
 *
 * @param color?: 칩 색상 (기본 white)
 * @returns string (white, blue, disabled)
 *
 * @param border?: 보더 사이즈 (기본 br_square_round_2)
 * @return "br_square_round_1" | "br_square_round_2" | "br_round";
 *
 * @param title: title로, 한 페이지 내에서 겹치지 않는 스위치 대상명을 정확히 보내주어야 함
 * @returns string
 */

export default function Chip({
  widthStyle,
  chipData,
  chipClick,
  chipSize,
  color,
  title,
  border,
  ...props
}: ChipProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [hover, setHover] = useState<boolean>(false);

  // chip은 기본 size가 sm
  const baseChipClassName = clsx({
    [style.chip]: true,
    [style.parentFit]: widthStyle && widthStyle === "parent-content",
    [style.xsm]: chipSize === "xsm",
    [style.md]: chipSize === "md",
    [style.lg]: chipSize === "lg",
    [style.xlg]: chipSize === "xlg",
    [style.sm]:
      !chipSize ||
      chipSize === "sm" ||
      (chipSize !== "xsm" &&
        chipSize !== "md" &&
        chipSize !== "lg" &&
        chipSize !== "xlg"),

    [style.white]: color === "white",
    [style.disabled]: color === "disabled",
    [style.blue]: color === "blue",
    [style.no_cursor]: !props.onClick && !chipClick,
  });
  return (
    <button
      title={chipData.name}
      className={clsx(
        baseChipClassName,
        border ? style[border] : style.br_square_round_2
      )}
      onClick={() => {
        if (props.onClick) return;
        if (chipClick) {
          chipClick(chipData);
        }
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      tabIndex={props.onClick || chipClick ? 0 : -1}
      {...props}
    >
      {chipData.name}
    </button>
  );
}
