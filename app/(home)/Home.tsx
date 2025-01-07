"use client";
import { useEffect, useState } from "react";
import ms from "./Home.module.scss";
import { useRouter } from "next/navigation";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

export default function Home() {
  /**
   * @name isLoaded
   * @description 애니메이션 동작 관리
   */
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  /**
   * @name useEffect
   * @description 페이지가 까만색이다가 배경이미지가 나오도록 하기 위한 상태값, 이벤트 리스너(load) 관리
   */
  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true); // 페이지 로드 후 상태 업데이트
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className={`${ms.container} ${isLoaded ? ms.loaded : ""}`}>
      <div className={ms.image}></div>

      {/* 배경이미지 중앙 기준 왼쪽 버튼 */}
      <button
        className={`${ms.button} ${ms.left}`}
        onClick={() => {
          router.push("/join");
        }}
      >
        <BsFillArrowRightCircleFill size={22} />
        SIGN UP
      </button>

      {/* 배경이미지 중앙 기준 오른쪽 버튼 */}
      <button
        className={`${ms.button} ${ms.right}`}
        onClick={() => {
          router.push("/login");
        }}
      >
        LOGIN
        <BsFillArrowLeftCircleFill size={22} />
      </button>
    </div>
  );
}
