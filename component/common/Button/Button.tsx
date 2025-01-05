"use client";

import { Ref, forwardRef, useState } from "react";
import style from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  title: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: () => void;
  type?: "submit" | "reset";
  size?: "xsm" | "sm" | "md" | "lg" | "xlg";
  color?: string;
  children: React.ReactNode | React.ReactNode[];
}

const TextButton = (
  {
    type,
    size,
    color,
    onClick,
    children,
    tabIndex,
    onBlur,
    title,
    id,
    disabled,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) => {
  // hover
  const [isHover, setIsHover] = useState<boolean>(false);

  const baseButtonClassName = clsx({
    [style.btn]: true,
    [style.xsm]: size === "xsm",
    [style.sm]: size === "sm",
    [style.md]:
      !size ||
      size === "md" ||
      (size !== "xsm" && size !== "sm" && size !== "lg" && size !== "xlg"),
    [style.lg]: size === "lg",
    [style.xlg]: size === "xlg",
  });

  return (
    <button
      ref={ref}
      id={id}
      type={type ? type : "button"}
      role="button"
      title={title}
      aria-label={title}
      tabIndex={tabIndex !== undefined ? tabIndex : 0}
      onClick={onClick}
      onBlur={onBlur ? onBlur : () => {}}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className={clsx(
        baseButtonClassName,
        color ? style[color] : style["white"],
        isHover === true
          ? color
            ? `${style[color + "_hover"]}`
            : `${style["white_hover"]}`
          : ""
      )}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};

export default forwardRef(TextButton);
