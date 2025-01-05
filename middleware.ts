import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";

export default withAuth(
  async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const token =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");
    const isLoggedIn = !!token;

    const isOnDashboard = url.pathname.startsWith("/dashboard");

    // 로그인하지않은 사용자 대시보드 접근 방지
    if (isOnDashboard && !isLoggedIn) {
      const loginUrl = new URL("/login", url.origin); // 리다이렉트
      loginUrl.searchParams.set("callbackUrl", url.pathname); // callbackUrl: 로그인 후 돌아올경로 지정
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next(); // 조건에 해당하지 않는 요청은 그대로 허용
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.url.includes("/dashboard")) {
          if (!token || !token.user) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      },
    },
  }
);

export const config = {
  // 이 미들웨어가 적용될 경로를 정의
  // 대시보드 관련 경로(`/dashboard/*`)뿐만 아니라 전체 경로(`/`)에도 조건을 적용
  matcher: ["/dashboard/:path*"], // Protect dashboard and other paths
};
