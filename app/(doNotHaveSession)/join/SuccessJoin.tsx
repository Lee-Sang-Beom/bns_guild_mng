"use client";

import { useRouter } from "next/navigation";
import ms from "./JoinDone.module.scss";
import Button from "@/component/common/Button/Button";

export default function SuccessJoin() {
  const router = useRouter();
  return (
    <div className={ms.inner}>
      {/* TOP */}
      <div className={ms.top}>
        <p className={ms.title}>회원가입 완료</p>
        <p className={ms.desc}>
          관리자 승인 이후, 로그인을 진행하실 수 있습니다.
        </p>
      </div>

      {/* MIDDLE */}
      <div className={ms.middle}>
        <img src="/img/success_login.gif" alt="회원가입 성공 이미지" />
      </div>

      {/* BOTTOM */}
      <div className={ms.bottom}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"로그인 페이지로 이동"}
            id={"move_login"}
            size="lg"
            onClick={(e) => {
              router.push("/login");
            }}
          >
            로그인 페이지로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
