import { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "NormalLogin",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
        authType: { label: "authType", type: "text" },
      },
      async authorize(
        credentials: Record<"id" | "password" | "authType", string> | undefined
      ) {
        if (!credentials) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/bapi/common/member/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.id,
              password: credentials.password,
              loginType: credentials.authType,
            }),
          }
        );
        const json = await res.json();

        if (json.code === "200") {
          return json.data;
        } else {
          throw new Error(JSON.stringify(json));
        }
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
    // JWT (JSON Web Token)의 생성과 검증을 사용자 정의하고 조작할 수 있게 합니다.
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
