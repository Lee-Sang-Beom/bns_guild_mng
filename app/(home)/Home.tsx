"use client";
import { useEffect, useState } from "react";
import ms from "./Home.module.scss";
import { useRouter } from "next/navigation";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "animate.css";
import TypeIt from "typeit";

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    // TypeIt 애니메이션 적용
    const typeItInstance = new TypeIt("#title", {
      strings: ["WELCOME TO SIGNATURE!", "👀"],
      speed: 300, // 타이핑 속도 조절
      waitUntilVisible: true,
      lifeLike: true,
      cursor: false, // 커서 숨기기
    });
    typeItInstance.go();

    if (document.readyState === "complete") {
      // 페이지가 완전히 로드되었는지 확인
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [isMounted]);

  return (
    <div className={`${ms.container} ${isLoaded ? ms.loaded : ""}`}>
      <div className={ms.image}></div>

      {/* 타이틀 애니메이션 추가 */}
      <p
        id="title" // ID를 설정하여 TypeIt에서 타겟으로 사용할 수 있도록 설정
        className={`${ms.title} ${isLoaded ? ms.titleLoaded : ""} animated`}
      ></p>

      {/* 왼쪽 버튼 */}
      <button
        className={`${ms.button} ${ms.left}`}
        onClick={() => {
          router.push("/join");
        }}
      >
        <BsFillArrowRightCircleFill size={22} />
        SIGN UP
      </button>

      {/* 오른쪽 버튼 */}
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
