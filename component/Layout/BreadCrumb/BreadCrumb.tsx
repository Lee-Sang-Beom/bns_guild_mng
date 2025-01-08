"use client";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import ms from "./BreadCrumb.module.scss";
import Link from "next/link";
import { RiHome3Fill } from "react-icons/ri";

// menuNm, menuUrl는 동일한 길이를 가져야함
interface IProps {
  menuNm: string;
  menuUrl: string;
}
export default function BreadCrumb({ menuNm, menuUrl }: IProps) {
  return (
    <>
      <div className={ms.wrap}>
        <span>
          <Link href="/dashboard">
            <RiHome3Fill size={16} role="img" aria-label="홈 아이콘" />홈
          </Link>
        </span>
        {menuUrl != "/dashboard" && (
          <>
            <span>
              <BiChevronRight
                size={16}
                role="img"
                aria-label="오른쪽 화살표 아이콘"
              />
            </span>
            <span>
              <Link href={menuUrl}>{menuNm}</Link>
            </span>
          </>
        )}
      </div>
    </>
  );
}
