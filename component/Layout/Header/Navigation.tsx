"use client";
import { MenuItem } from "@/types/common/commonType";
import ms from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import Link from "next/link";
import { RiHome3Fill } from "react-icons/ri";

// 메뉴 아이콘을 선택하는 함수
const getMenuIcon = (menuSeq: number) => {
  const size: number = 22;
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

interface IProps {
  menuList: MenuItem[];
}

export default function Navigation({ menuList }: IProps) {
  const pathname = usePathname();

  return (
    <nav className={ms.bottom}>
      <ul>
        {menuList.map((menu) => (
          <li key={menu.menuSeq}>
            <Link
              href={menu.menuUrl}
              prefetch={true}
              className={pathname === menu.menuUrl ? ms.active : ""}
            >
              {/* 아이콘 렌더링 */}
              {getMenuIcon(menu.menuSeq)}
              {menu.menuNm}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
