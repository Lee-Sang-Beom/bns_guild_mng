import NextAuth from "next-auth";
import { UserAuthType } from "../common/commonType";

declare module "next-auth" {
  interface User {
    id: string; // 유저 ID (유저 닉네임)
    password: string; // 유저 pswd
    authType: UserAuthType; // 유저 권한
    useYn: "Y" | "N"; // 사용 여부

    message?: string; // 로그인 실패 시, 메시지가 담길 내용
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
