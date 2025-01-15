"use client";

import ms from "./Error.module.scss";
import Button from "@/component/common/Button/Button";

export default function Error() {
  return (
    <div className={ms.sec}>
      <div className={ms.inner}>
        <div className={ms.top}>
          <img
            src="/img/img-error-common-page-logo.svg"
            alt="에러페이지 메인로고"
          />
        </div>
        <div className={ms.middle}>
          <p>페이지에 접근할 수 없습니다.</p>
          <span>
            데이터 처리 중 오류가 발생하여 페이지 접근이 중단되었습니다.
          </span>
          <span>확인 후 다시 시도해주세요.</span>
        </div>
        <div className={ms.bottom}>
          <Button
            color="white"
            title="대시보드 이동"
            size="lg"
            id="move"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
}
