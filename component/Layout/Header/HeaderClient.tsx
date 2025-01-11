"use client";

import ms from "./Header.module.scss";
import Navigation from "./Navigation";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { Session } from "next-auth";
import InfoUserManage from "./InfoUserManage/InfoUserManage";

interface IProps {
  session: Session | null;
}
export default function HeaderClient({ session }: IProps) {
  const router = useRouter();
  const { setText, setIsChange, setStatus } = useAutoAlert();

  const clearCache = () => {
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
    }
  };

  return (
    <header id="header" className={ms.header}>
      {/* TOP - 메인 로고 및 로그아웃 버튼 */}
      <div className={ms.top}>
        <img src="/img/logo.jpg" alt="시그니처 메인 로고" />
        <div className={ms.btn_box}>
          <button
            title="로그아웃"
            className={ms.logout}
            onClick={async () => {
              await signOut({
                redirect: false,
              });

              setText("로그아웃이 완료되었습니다.");
              setStatus("success");
              setIsChange(true);

              clearCache();
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            }}
          >
            <span>
              <CiLogout />
              로그아웃
            </span>
          </button>
        </div>
      </div>

      {/* MIDDLE - Navigation */}
      <Navigation />

      {/* BOTTOM - User Info Manage */}
      {session && session.user && <InfoUserManage session={session} />}
    </header>
  );
}
