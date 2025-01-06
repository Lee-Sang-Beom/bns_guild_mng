"use client";

import { useRouter } from "next/navigation";
import ms from "./JoinDone.module.scss";
import Button from "@/component/common/Button/Button";

export default function RejectJoin({ res }: any) {
  const router = useRouter();
  return (
    <div className={ms.inner}>
      <div className={ms.top}>
        <p className={ms.title}>회원가입 실패</p>
        <p className={ms.desc}>{res.message}</p>
      </div>
      <div className={ms.middle}>
        <img src="/img/reject_login.gif" alt="회원가입 실패 이미지" />
      </div>
      <div className={ms.bottom}>
        <div className={ms.btn_box}>
          <Button
            color={"blue"}
            title={"회원가입 페이지로 이동"}
            id={"move_join"}
            size="lg"
            type="submit"
            onClick={(e) => {
              if (!window) return;
              window.location.reload();
            }}
          >
            회원가입 페이지로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
