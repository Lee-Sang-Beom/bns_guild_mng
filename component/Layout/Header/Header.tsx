import { MenuItem } from "@/types/common/commonType";
import HeaderClient from "./HeaderClient";

export default function Header() {
  /**
   * @name menuList
   * @description 메뉴 리스트 (필요 시, 차후 서버에서 관리하여 내려줄 수 있도록 할 것임)
   */
  const menuList: MenuItem[] = [
    { menuSeq: 1, menuNm: "Home", menuUrl: "/dashboard" },
    { menuSeq: 2, menuNm: "CashShare", menuUrl: "/dashboard/cashshare" },
    { menuSeq: 3, menuNm: "Artworks", menuUrl: "/dashboard/artworks" },
    { menuSeq: 4, menuNm: "Notice", menuUrl: "/dashboard/notice" },
  ];

  return <HeaderClient menuList={menuList} />;
}
