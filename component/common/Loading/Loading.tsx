"use client";

import CircularProgress from "@mui/material/CircularProgress";
import style from "./Loading.module.scss";

interface LoadingProps {
  text?: string;
  open: boolean;
}

export default function Loading({ text, open }: LoadingProps) {
  return (
    <div className={`${style.loading_box} ${open ? style.open : ""}`}>
      <CircularProgress />
      <p className={style.txt}>{text === "" ? "로딩 중입니다..." : text}</p>
    </div>
  );
}
