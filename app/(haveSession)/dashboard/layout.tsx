import { MenuItem } from "@/types/common/commonType";
import ms from "./layout.module.scss";
import Header from "@/component/Layout/Header/Header";
import BreadCrumb from "@/component/Layout/BreadCrumb/BreadCrumb";
import SubTop from "@/component/Layout/SubTop/SubTop";

export default function HaveSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * @name menuList
   * @description 메뉴 리스트 (필요 시, 차후 서버에서 관리하여 내려줄 수 있도록 할 것임)
   */
  const menuList: MenuItem[] = [
    { menuSeq: 1, menuNm: "홈", menuUrl: "/dashboard" },
    { menuSeq: 2, menuNm: "분배금 관리", menuUrl: "/dashboard/cashshare" },
    { menuSeq: 3, menuNm: "아트워크", menuUrl: "/dashboard/artworks" },
    { menuSeq: 4, menuNm: "공지사항", menuUrl: "/dashboard/notice" },
  ];

  return (
    <div className={ms.wrap}>
      {/* LEFT */}
      <div className={ms.left}>
        <Header menuList={menuList} />
      </div>

      {/* RIGHT */}
      <div className={ms.right}>
        <div className={ms.right_top}>
          <SubTop menuList={menuList} />
        </div>
        <div className={ms.right_bottom}>{children}</div>
      </div>
    </div>
  );
}
