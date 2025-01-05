import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // 유저 ID (유저 닉네임)
    password: string; // 유저 pswd
    authType: "ADMIN" | "NORMAL"; // 유저 권한
    useYn: "Y" | "N"; // 사용 여부
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
