"use client";
import { MenuItem } from "@/types/common/commonType";
import ms from "./SubTop.module.scss";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiHome3Fill } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";
import { AiFillPicture } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import { menuList } from "@/datastore/common/common";

interface IProps {
  menuList: MenuItem[];
}

// 메뉴 아이콘을 선택하는 함수
const getMenuIcon = (menuSeq: number) => {
  const size: number = 32;
  switch (menuSeq) {
    case 1:
      return <RiHome3Fill size={size} />;
    case 2:
      return <GiPayMoney size={size} />;
    case 3:
      return <AiFillPicture size={size} />;
    default:
      return <FaPaperPlane size={size} />;
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
