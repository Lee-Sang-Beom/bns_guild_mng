"use client";
import { MenuItem } from "@/types/common/commonType";
import ms from "./Header.module.scss";
import "animate.css";
interface IProps {
  menuList: MenuItem[];
}
export default function HeaderClient({ menuList }: IProps) {
  return (
    <header id="header" className={ms.header}>
      {/* TOP - 메인 로고 */}
      <div className={ms.top}>
        <img src="/img/logo.jpg" alt="시그니처 메인 로고" />
      </div>

      {/* BOTTOM - Navigation */}
      <nav className={ms.bottom}>
        <ul>
          {menuList.map((menu) => {
            return <li>{menu.menuNm}</li>;
          })}
        </ul>
      </nav>
    </header>
  );
}
