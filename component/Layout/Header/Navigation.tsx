"use client";
import ms from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { GiOrganigram, GiPayMoney } from "react-icons/gi";
import Link from "next/link";
import { RiHome3Fill } from "react-icons/ri";
import { menuList } from "@/datastore/common/common";

// 메뉴 아이콘을 선택하는 함수
const getMenuIcon = (menuSeq: number) => {
  const size: number = 22;
  switch (menuSeq) {
    case 1:
      return <RiHome3Fill size={size} role="홈 아이콘" />;
    case 2:
      return <GiPayMoney size={size} role="돈을 떨어뜨리는 손 아이콘" />;
    case 3:
      return <GiOrganigram size={size} role="조직 아이콘" />;
    default:
      return <FaPaperPlane size={size} role="공지사항 아이콘" />;
  }
};

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={ms.middle}>
      <ul>
        {menuList
          .filter((menu) => menu.mainShow === "Y")
          .map((menu) => (
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
