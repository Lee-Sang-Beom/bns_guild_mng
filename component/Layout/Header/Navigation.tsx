"use client";
import ms from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import Link from "next/link";
import { RiHome3Fill } from "react-icons/ri";
import { menuList } from "@/datastore/common/common";

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

export default function Navigation() {
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
