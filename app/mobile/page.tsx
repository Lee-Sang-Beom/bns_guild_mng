import ms from "./mobile.module.scss";

export default function Page() {
  return (
    <div className={ms.inner}>
      {/* TOP */}
      <div className={ms.top}>
        <p className={ms.title}>403</p>
        <p className={ms.desc}>
          본 홈페이지는 모바일 접근을 제한하고 있습니다.
        </p>
      </div>

      {/* MIDDLE */}
      <div className={ms.middle}>
        <img src="/img/mobile_redirect.gif" alt="모바일 리다이엑트 이미지" />
      </div>

      {/* BOTTOM */}
      <div className={ms.bottom}></div>
    </div>
  );
}
