"use client";
import { useEffect, useState } from "react";
import styles from "./Paging.module.scss";
import { FiPlus } from "react-icons/fi";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";

interface PagingProps {
  onClickEvent: (page: number) => void;
  onMoClickEvent?: (size: number) => void;
  defaultSize?: number;
  pagingData: {
    first: boolean;
    last: boolean;
    size: number;
    totalPages: number;
    totalElements: number;
    number: number;
  };
  nonCenterTracking?: boolean;
}

/**
 * 페이징 컴포넌트
 * @param onClickEvent 화살표 또는 숫자 버튼을 클릭했을 때의 동작 (페이지 이동 동작함수)
 * @param onMoClickEvent 모바일 화살표 또는 숫자 버튼을 클릭했을 때의 동작 (페이지 이동 동작함수), router.push 괄호 안에 scroll 옵션 false로 줘야 모바일 클릭 시 스크롤이 이동되지 않습니다.
 * ex) router.push(`주소`, {scroll : false})
 * @param defaultSize 모바일 기본 사이즈 (기본 사이즈가 10이 아니면!)
 * @param pagingData :  페이징 데이터, DTO는 공통 pagingType
 * @param nonCenterTracking : 없거나 false일 경우 기본 (현재 페이지가 가운데 고정되는 타입), true이면 현재 페이지가 가운데에 고정되지 않는 타입
 */
export default function PagingComponent({
  onClickEvent,
  onMoClickEvent,
  defaultSize,
  pagingData,
  nonCenterTracking,
}: PagingProps) {
  const [curNum, setCurNum] = useState(1);

  useEffect(() => {
    setCurNum(Number(pagingData.number));
  }, [pagingData]);

  const goFirst = () => {
    setCurNum(1);
    onClickEvent(1);
  };

  const goPrev = () => {
    if (curNum === 1) return;
    setCurNum(curNum - 1);
    onClickEvent(curNum - 1);
  };

  const goNext = () => {
    if (curNum === pagingData.totalPages) return;
    setCurNum(curNum + 1);
    onClickEvent(curNum + 1);
  };

  const goEnd = () => {
    setCurNum(pagingData.totalPages);
    onClickEvent(pagingData.totalPages);
  };

  const goAdd = () => {
    if (curNum === pagingData.totalPages) return;
    if (onMoClickEvent && defaultSize) {
      onMoClickEvent(pagingData.size + defaultSize);
    } else if (onMoClickEvent) {
      onMoClickEvent(pagingData.size + 10);
    }
  };

  const centerTrackingRenderingTablePaginationCurNumComponent = () => {
    let renderButtons = []; // 페이지 번호 버튼을 저장할 배열

    if (pagingData) {
      let pageFirst: number; // 첫 번째 페이지 번호
      let pageLast: number; // 마지막 페이지 번호

      if (curNum <= 5) {
        pageFirst = 1; // 첫 번째 페이지 번호를 1로 설정
        pageLast = Math.min(9, pagingData.totalPages); // 마지막 페이지 번호를 9 또는 총 페이지 수로 설정
      } else if (curNum >= pagingData.totalPages - 4) {
        pageFirst = Math.max(pagingData.totalPages - 8, 1); // 첫 번째 페이지 번호를 총 페이지 수 - 8 또는 1로 설정
        pageLast = pagingData.totalPages; // 마지막 페이지 번호를 총 페이지 수로 설정
      } else {
        pageFirst = Math.max(curNum - 4, 1); // 첫 번째 페이지 번호를 현재 페이지 번호 - 4 또는 1로 설정
        pageLast = Math.min(curNum + 4, pagingData.totalPages); // 마지막 페이지 번호를 현재 페이지 번호 + 4 또는 총 페이지 수로 설정
      }

      if (isNaN(pageFirst) || isNaN(pageLast)) {
        pageFirst = 1; // 페이지 번호가 NaN인 경우 1로 설정
        pageLast = 1; // 페이지 번호가 NaN인 경우 1로 설정
        setCurNum(1); // 현재 페이지 번호를 1로 설정
      }

      for (let i = pageFirst; i <= pageLast; i++) {
        const curNumber = i;
        renderButtons.push(
          <button
            key={i}
            className={
              curNum === curNumber
                ? `${styles.on} ${styles.number_button}`
                : `${styles.number_button}`
            }
            onClick={() => {
              setCurNum(curNumber);
              onClickEvent(curNumber);
            }}
            title="해당 페이지로 이동"
          >
            {curNumber}
          </button>
        );
      }

      return renderButtons;
    }
  };

  const nonCenterTrackingRenderingTablePaginationCurNumComponent = () => {
    const pagingWrapSize = 10;
    let renderButtons = [];

    let pageFirst = Math.max(
      curNum - 1 - ((curNum - 1) % pagingWrapSize) + 1,
      1
    ); // 첫 번째 페이지 번호
    let pageLast = Math.min(
      curNum - 1 - ((curNum - 1) % pagingWrapSize) + pagingWrapSize,
      pagingData.totalPages
    ); // 마지막 페이지 번호

    if (isNaN(pageFirst) || isNaN(pageLast)) {
      pageFirst = 1; // 페이지 번호가 NaN인 경우 1로 설정
      pageLast = 1; // 페이지 번호가 NaN인 경우 1로 설정
      setCurNum(1); // 현재 페이지 번호를 1로 설정
    }

    for (let i = pageFirst; i <= pageLast; i++) {
      const curNumber = i;
      renderButtons.push(
        <button
          key={i}
          className={
            curNum === curNumber
              ? `${styles.on} ${styles.number_button}`
              : `${styles.number_button}`
          }
          onClick={() => {
            setCurNum(curNumber);
            onClickEvent(curNumber);
          }}
          title="해당 페이지로 이동"
        >
          {curNumber}
        </button>
      );
    }

    return renderButtons;
  };

  return (
    <>
      <div className={styles.pg}>
        <button
          type="button"
          className={`${styles.arrow_button} ${
            pagingData.totalPages === 0 || pagingData.totalPages === null
              ? styles.noData
              : pagingData.first === true
              ? styles.noMorePage
              : styles.general_button
          }`}
          disabled={
            pagingData.totalPages === 0 ||
            pagingData.totalPages === null ||
            pagingData.first === true
          }
          onClick={() => {
            goFirst();
          }}
          title="처음 페이지로 이동"
        >
          <BiChevronsLeft role="img" aria-label="처음 페이지로 이동 아이콘" />
        </button>
        <button
          type="button"
          className={`${styles.arrow_button} ${
            pagingData.totalPages === 0 || pagingData.totalPages === null
              ? styles.noData
              : pagingData.first === true
              ? styles.noMorePage
              : styles.general_button
          }`}
          disabled={
            pagingData.totalPages === 0 ||
            pagingData.totalPages === null ||
            pagingData.first === true
          }
          onClick={() => {
            goPrev();
          }}
          title="이전 페이지로 이동"
        >
          <BiChevronLeft role="img" aria-label="이전 페이지로 이동 아이콘" />
        </button>
        {nonCenterTracking
          ? nonCenterTrackingRenderingTablePaginationCurNumComponent()
          : centerTrackingRenderingTablePaginationCurNumComponent()}
        <button
          type="button"
          className={`${styles.arrow_button} ${
            pagingData.totalPages === 0 || pagingData.totalPages === null
              ? styles.noData
              : pagingData.last === true
              ? styles.noMorePage
              : styles.general_button
          }`}
          onClick={() => {
            goNext();
          }}
          disabled={
            pagingData.totalPages === 0 ||
            pagingData.totalPages === null ||
            pagingData.last === true
          }
          title="다음 페이지로 이동"
        >
          <BiChevronRight role="img" aria-label="다음 페이지로 이동 아이콘" />
        </button>
        <button
          type="button"
          className={`${styles.arrow_button} ${
            pagingData.totalPages === 0 || pagingData.totalPages === null
              ? styles.noData
              : pagingData.last === true
              ? styles.noMorePage
              : styles.general_button
          }`}
          disabled={
            pagingData.totalPages === 0 ||
            pagingData.totalPages === null ||
            pagingData.last === true
          }
          onClick={() => {
            goEnd();
          }}
          title="마지막 페이지로 이동"
        >
          <BiChevronsRight
            role="img"
            aria-label="마지막 페이지로 이동 아이콘"
          />
        </button>
      </div>
      <div className={styles.m_pg}>
        <button onClick={goAdd}>
          <FiPlus
            style={{ marginLeft: "5px" }}
            role="img"
            aria-label="더보기 아이콘"
          />
          {`더보기(${
            pagingData.size > pagingData.totalElements
              ? pagingData.totalElements
              : pagingData.size
          }/${pagingData.totalElements})`}
        </button>
      </div>
    </>
  );
}
