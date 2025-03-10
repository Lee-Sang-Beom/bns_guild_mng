"use client";
import { MenuItem } from "@/types/common/commonType";
import ms from "./SubTop.module.scss";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiHome3Fill } from "react-icons/ri";
import { GiOrganigram, GiPayMoney } from "react-icons/gi";
import { FaPaperPlane } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { menuList } from "@/datastore/common/common";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";

interface IProps {
  menuList: MenuItem[];
}

// 메뉴 아이콘을 선택하는 함수
const getMenuIcon = (menuSeq: number) => {
  const size: number = 32;
  switch (menuSeq) {
    case 1:
      return <RiHome3Fill size={size} role="img" aria-label="홈 아이콘" />;
    case 2:
      return (
        <GiPayMoney
          size={size}
          role="img"
          aria-label="돈을 떨어뜨리는 손 아이콘"
        />
      );
    case 3:
      return (
        <CiCalendarDate size={size} role="img" aria-label="캘린더 아이콘" />
      );
    case 4:
      return <GiOrganigram size={size} role="img" aria-label="조직 아이콘" />;
    case 5:
    case 6:
      return (
        <FaPaperPlane size={size} role="img" aria-label="공지사항 아이콘" />
      );
    case 7:
    case 8:
      return (
        <MdOutlineTipsAndUpdates
          size={size}
          role="img"
          aria-label="업데이트 알림용 전구 아이콘"
        />
      );
    default:
      return (
        <BiSolidMessageSquareDots
          size={size}
          role="img"
          aria-label="말풍선아이콘"
        />
      );
  }
};

export default function SubTop() {
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<MenuItem | null>(null);
  useEffect(() => {
    if (!pathname) return;

    const currentMenu = menuList.find((menu) => {
      return menu.menuUrl === pathname;
    });
    setCurrentMenu(currentMenu || null);
  }, [pathname]);

  return (
    <div className={ms.wrap}>
      {/* LEFT */}
      <div className={ms.left}>
        {currentMenu && (
          <p>
            {getMenuIcon(currentMenu.menuSeq)}
            {currentMenu.menuNm}
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className={ms.right}>
        {currentMenu && (
          <BreadCrumb
            menuNm={currentMenu.menuNm}
            menuUrl={currentMenu.menuUrl}
          />
        )}
      </div>
    </div>
  );
}
