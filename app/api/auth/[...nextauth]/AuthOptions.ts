import { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { ApiResponse } from "@/types/common/commonType";
import { loginCollectionUser } from "@/utils/doNotHaveSession/login/action";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "NormalLogin",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"id" | "password", string> | undefined
      ) {
        if (!credentials) return null;

        const res: ApiResponse<User | null> = await loginCollectionUser(
          credentials
        );

        if (res.success && res.data) {
          // 성공 시 메시지와 유저 객체 반환
          return res.data;
        }

        // 실패 시 메시지만 반환
        throw new Error(res.message || "로그인 중 오류가 발생했습니다.");
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
};
