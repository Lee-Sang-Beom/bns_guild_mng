"use client";

import { MenuItem } from "@/types/common/commonType";
import ms from "./Header.module.scss";
import Navigation from "./Navigation";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
interface IProps {
  menuList: MenuItem[];
}
export default function HeaderClient({ menuList }: IProps) {
  const router = useRouter();
  const { setText, setIsChange, setStatus } = useAutoAlert();

  return (
    <header id="header" className={ms.header}>
      {/* TOP - 메인 로고 및 로그아웃 버튼 */}
      <div className={ms.top}>
        <img src="/img/logo.jpg" alt="시그니처 메인 로고" />
        <div className={ms.btn_box}>
          <button
            className={ms.logout}
            onClick={async () => {
              await signOut({
                redirect: false,
              });

              setText("로그아웃이 완료되었습니다.");
              setStatus("success");
              setIsChange(true);

              setTimeout(() => {
                router.push("/");
              }, 2000);
            }}
          >
            <span>
              <CiLogout />
              로그아웃
            </span>
          </button>
        </div>
      </div>

      {/* BOTTOM - Navigation */}
      <Navigation menuList={menuList} />
    </header>
  );
}
