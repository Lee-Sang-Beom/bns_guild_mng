"use client";

import { BiSolidUserCircle } from "react-icons/bi";
import ms from "./Header.module.scss";
import { Session } from "next-auth";
import { GrSettingsOption } from "react-icons/gr";

interface IProps {
  session: Session | null;
}

export default function InfoUserManage({ session }: IProps) {
  return (
    <div className={ms.bottom}>
      <div className={ms.inner}>
        {/* LEFT */}
        <p className={`${ms.left} ${ms.info_txt}`}>
          <BiSolidUserCircle size={22} role="img" aria-label="유저 아이콘" />
          {session && session.user && session.user.id}
        </p>

        {/* RIGHT */}
        <button
          className={`${ms.right} ${ms.option_btn}`}
          title="개인정보 수정"
          onClick={() => {}}
        >
          <GrSettingsOption size={22} role="img" aria-label="톱니바퀴 아이콘" />
        </button>
      </div>
    </div>
  );
}
