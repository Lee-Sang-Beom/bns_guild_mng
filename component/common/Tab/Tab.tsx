"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./Tab.module.scss";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

interface TabProps {
  defaultActiveIndex?: number;
  tabTitle: string[];
  titleClick?: (tit: string) => void;
  children: React.ReactNode[];
  color: "white" | "black" | "blue";
}

export default function Tab({
  defaultActiveIndex,
  tabTitle,
  titleClick,
  children,
  color,
}: TabProps) {
  //
  const router = useRouter();

  // 현재 탭 인덱스
  const [activeIdx, setActiveIdx] = useState(
    defaultActiveIndex ? defaultActiveIndex : 0
  );

  useEffect(() => {
    setActiveIdx(defaultActiveIndex ? defaultActiveIndex : 0);
  }, [defaultActiveIndex]);

  return (
    <>
      <ul className={style.tab_btn_box}>
        {tabTitle.map((tit: string, index: number) => {
          return (
            <li
              key={tit}
              className={`${style.tab_btn} ${style[color]} ${
                activeIdx === index ? style.active : ""
              }`}
            >
              <Button
                title="버튼"
                id={`${tit}_btn`}
                color={color ? color : undefined}
                onClick={() => {
                  if (titleClick) {
                    titleClick(tit);
                  }
                  setActiveIdx(index);
                }}
              >
                {tit}
              </Button>
            </li>
          );
        })}
      </ul>
      {children !== undefined && children !== null ? (
        <div className={style.tab_cont}>{children[activeIdx]}</div>
      ) : (
        <></>
      )}
    </>
  );
}
