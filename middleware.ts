import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";

export default withAuth(
  async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const pathname = url.pathname;

    const token =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");

    const isLoggedIn = !!token;
    const isOnDashboard = pathname.startsWith("/dashboard");

    // 모바일 디바이스 감지 (User-Agent 기반)
    const userAgent = req.headers.get("user-agent") || "";
    const isMobile = /android|iphone|ipad|mobile/i.test(userAgent);

    // 모바일 기기 접근 시 특정 페이지로 리다이렉트
    if (isMobile && pathname !== "/mobile") {
      const mobileUrl = new URL("/mobile", url.origin);
      return NextResponse.redirect(mobileUrl);
    }

    // .css, .scss 파일인 경우 요청 그대로 진행
    if (pathname.match(/\.(css|scss)$/)) {
      return NextResponse.next(); // CSS/SCSS 파일은 미들웨어 처리하지 않음
    }

    // 로그인하지 않은 사용자가 대시보드에 접근하는 경우 로그인 페이지로 리다이렉트
    if (!isLoggedIn && isOnDashboard) {
      const loginUrl = new URL("/login", url.origin); // 리다이렉트
      loginUrl.searchParams.set("callbackUrl", pathname); // 로그인 후 돌아올 경로
      return NextResponse.redirect(loginUrl);
    }

    // 로그인한 사용자가 대시보드 외의 페이지에 접근하는 경우 대시보드로 리다이렉트
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
  // 미들웨어가 적용되지 않도록 처리한 URL 패턴을 제외한 나머지 URL에 대해 미들웨어를 적용
  matcher: [
    "/((?!_next|favicon.ico|img).*)", // .css, .scss를 제외한 모든 요청에 대해 미들웨어 적용
  ],
};
