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
          로그인 페이지로 이동하여, 로그인을 진행해주세요.
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
            type="submit"
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
