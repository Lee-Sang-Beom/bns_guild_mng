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

    // 로그인하지않은 사용자 대시보드 접근 방지 : 로그인 페이지로 이동
    if (!isLoggedIn && isOnDashboard) {
      const loginUrl = new URL("/login", url.origin); // 리다이렉트
      loginUrl.searchParams.set("callbackUrl", url.pathname); // callbackUrl: 로그인 후 돌아올경로 지정
      return NextResponse.redirect(loginUrl);
    }

    // 로그인했는데 사용자 대시보드 접근이 아닌경우 : 대시보드 이동
    if (isLoggedIn && !isOnDashboard) {
      const dashboardUrl = new URL("/dashboard", url.origin); // 리다이렉트
      return NextResponse.redirect(dashboardUrl);
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
  // 정적 리소스 요청 제외 (_next, public 폴더 포함)
  matcher: ["/((?!_next|favicon.ico|img).*)"],
};
