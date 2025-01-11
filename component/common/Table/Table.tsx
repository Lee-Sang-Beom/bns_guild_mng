"use client";
import CSS from "csstype";
import React, { Ref, forwardRef, useEffect, useRef, useState } from "react";
import style from "./Table.module.scss";
import Checkbox from "../Checkbox/Checkbox";

export interface TableHeader {
  /**
   * 실제로 보이는 이름
   */
  name: string;
  /**
   * 실제 데이터의 키값과 매칭 되는 값
   */
  value: string;
  /**
   * 정렬(텍스트만 가능?)
   */
  align?: CSS.Property.TextAlign;
  /**
   * 컬럼 width -> 테이블이 horizontal 일 경우 첫번째 두번째 데이터의 width만 적용됨
   */
  width?: string;
  /**
   * 로우 값을 받아서 커스텀 할 수 있는 함수
   */
  accessFn?: Function;
  /**
   * 테이블에 폼을 넣을 경우 사용. 지금은 checkbox만 가능 추후 필요하면 추가
   */
  form?: "allCheck" | "check";
  /**
   * form에서 select를 선택 했을시 select의 option 데이터
   */
  options?: any[];
  /**
   * 유효성 검사 editable에서만 사용(editable 필요한 경우 추가 함)
   */
  valid?: Function;
}

interface TableProps<T> {
  /**
   * 데이터: checkbox 사용 시, 항상 data는 rowId property를 들고 있어야 함
   */
  data: T[];
  /**
   * 테이블 헤더
   */
  headers: TableHeader[];
  /**
   * 테이블 형태
   */
  tableType: "vertical" | "horizontal";
  /**
   * 테이블 요소 높이
   */
  tableEleHeight?: "small" | "normal";
  /**
   * 데이터 로딩 중일 때 tbody에 데이터 불러오는 중입니다 메세지 제공
   */
  isLoading?: boolean;
  /**
   * 웹접근성 : caption
   */
  tableCaption: string;
  /**
   * 웹 접근성과 체크박스 스크린 리더를 위한 props,
   * 체크 박스 클릭 시 해당 제목을 가져옴
   * 데이터 key
   * header value 값ㄴ
   */
  itemTitle: string;
  /**
   * tr 호버 여부
   */
  trHover?: boolean;
  /**
   * 체크된 리스트 배열
   */
  checkList?: (list: T[]) => void;
  /**
   * 체크 초기화
   */
  checkYn?: "Y" | "N";
  setCheckYn?: Function;
  /**
   * horizontal 타입일 때 모바일 반응형 적용 안되게 하기
   */
  noHorizontalResponsive?: boolean;
}
/**
 * @param data (필수) 데이터
 * @param headers (필수) 테이블 헤더
 * @param tableTupe (필수) 테이블 가로 세로 방향
 * @param tableEleHeight : 테이블 각 요소의 높이를 일반 페이징 테이블보다 낮게 하고 싶으면 "smail" 전달 (default "normal")
 * @param trHover tr hover 여부
 * @param isLoading 데이터 로딩 중일 때 tbody에 데이터 불러오는 중입니다. 표시(react query 사용시 사용하면 좋음)
 * @param tableCaption 웹접근성을 위한 테이블의 caption
 * @param itemTitle 웹 접근성과 체크박스 스크린 리더를 위한 props > 체크 박스 클릭 시 해당 props로 접근해 제목을 가져옴
 * @pcNone 모바일에서는 보이고 웹에서는 안보일 경우 안 보이는 컬럼 index로 보내줘야 함 제일 왼쪽이 1
 * @mobileNone 모바일일 경우 안 보이는 컬럼 index로 보내줘야 함 제일 왼쪽이 1
 * @param checkList 체크 리스트
 */

const Table = forwardRef(
  <T extends { rowId: string }>(
    {
      data,
      headers,
      tableType,
      tableEleHeight,
      isLoading,
      trHover,
      tableCaption,
      itemTitle,
      checkList,
      checkYn,
      setCheckYn,
      noHorizontalResponsive,
    }: TableProps<T>,
    ref: Ref<any>
  ) => {
    // check
    let checkRef = useRef<HTMLInputElement[]>([]);
    const [checkArray, setCheckArray] = useState<T[]>([]);
    const [keyboardSyncAllEventBoolean, setKeyboardSyncAllEventBoolean] =
      useState<boolean>(false);
    const [
      keyboardSyncIndividEventBoolean,
      setKeyboardSyncIndividEventBoolean,
    ] = useState<boolean[]>(
      data === null || !data.length ? [false] : data.map((item) => false)
    );

    // 데이터가 바뀌면 모든 체크리스트 초기화
    useEffect(() => {
      if (data && data.length) {
        setCheckArray([]);
      }
    }, [data]);

    useEffect(() => {
      if (checkList !== undefined) {
        checkList(checkArray);
      }

      if (checkArray.length === data.length) {
        setKeyboardSyncAllEventBoolean(true);
        setKeyboardSyncIndividEventBoolean(data.map((item) => true));
      }

      if (checkArray.length === 0) {
        setKeyboardSyncAllEventBoolean(false);
        setKeyboardSyncIndividEventBoolean(data.map((item) => false));
      }

      if (checkArray.length < data.length) {
        setKeyboardSyncAllEventBoolean(false);
      }
    }, [checkArray]);

    useEffect(() => {
      if (checkYn === "N") {
        setCheckArray([]);
      }
    }, [checkYn]);

    return tableType === "vertical" ? (
      <table
        className={`${noHorizontalResponsive ? style.tb_st3 : style.tb_st1} ${
          tableEleHeight && tableEleHeight === "small" ? style.small : ""
        }`}
        ref={ref}
      >
        <colgroup>
          {headers.map((width: TableHeader, index: number) => {
            return (
              <col
                key={`vertical_${index}`}
                width={width.width ? width.width : "auto"}
              />
            );
          })}
        </colgroup>
        <caption>{tableCaption}</caption>
        <thead>
          <tr>
            {headers.map((thead: TableHeader, thIndex: number) => {
              switch (thead.form) {
                case "allCheck":
                  return (
                    <th key={`thCheck_${thead.value}_${thead.name}`}>
                      <Checkbox
                        title="모두 선택"
                        id={"thChekcBoxAll"}
                        style={{ margin: "0 auto" }}
                        checked={
                          data.length === 0
                            ? false
                            : data.length === checkArray.length
                            ? true
                            : false
                        }
                        // @ts-ignore
                        onChange={({ target: { checked } }) => {
                          if (checked === true) {
                            if (setCheckYn) {
                              setCheckYn("Y");
                            }
                            setKeyboardSyncAllEventBoolean((prev) => !prev);
                            setCheckArray(data);
                          } else if (checked === false) {
                            setKeyboardSyncAllEventBoolean((prev) => !prev);
                            setCheckArray([]);
                          }
                          //   handleInputChange(e);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (keyboardSyncAllEventBoolean === false) {
                              setKeyboardSyncAllEventBoolean((prev) => !prev);
                              setCheckArray(data);
                            } else if (keyboardSyncAllEventBoolean === true) {
                              setKeyboardSyncAllEventBoolean((prev) => !prev);
                              setCheckArray([]);
                            }
                          }
                        }}
                      />
                    </th>
                  );

                default:
                  return (
                    <th key={`thCheck_${thead.value}_${thead.name}`}>
                      {thead.name}
                    </th>
                  );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className={style.no_data}>
              <td colSpan={headers.length}>데이터가 없습니다.</td>
            </tr>
          ) : (
            data.map((tbody, trIndex) => {
              return (
                <tr
                  key={`tbody_${trIndex}`}
                  className={`${
                    trHover && trHover === true ? style.hover : ""
                  }`}
                >
                  {headers.map((thead: TableHeader, tdIndex) => {
                    if (thead.form === "allCheck" || thead.form === "check") {
                      return (
                        <td key={`check_${thead.value}`}>
                          <Checkbox
                            title="체크박스"
                            id={"thChekcBox"}
                            data-value={trIndex}
                            style={{ margin: "0 auto" }}
                            ref={(elem) => {
                              if (elem !== null) {
                                checkRef.current[trIndex] = elem;
                              }
                            }}
                            checked={
                              checkArray.some(
                                (seq) => seq.rowId === tbody.rowId
                              )
                                ? true
                                : false
                            }
                            // @ts-ignore
                            onChange={({ target: { checked } }) => {
                              if (checked === true) {
                                if (setCheckYn) {
                                  setCheckYn("Y");
                                }
                                setCheckArray([...checkArray, tbody]);

                                const newKeyboardSyncIndividEventBoolean =
                                  keyboardSyncIndividEventBoolean.map(
                                    (item, idx) => {
                                      if (idx === trIndex) {
                                        return !item;
                                      } else {
                                        return item;
                                      }
                                    }
                                  );

                                setKeyboardSyncIndividEventBoolean(
                                  newKeyboardSyncIndividEventBoolean
                                );
                              } else if (checked === false) {
                                setCheckArray((array) => {
                                  if (
                                    array.some(
                                      (seq) => seq.rowId === tbody.rowId
                                    )
                                  ) {
                                    const removeList = array.filter(
                                      (seq) => seq.rowId !== tbody.rowId
                                    );
                                    return [...removeList];
                                  } else {
                                    return checkArray;
                                  }
                                });

                                const newKeyboardSyncIndividEventBoolean =
                                  keyboardSyncIndividEventBoolean.map(
                                    (item, idx) => {
                                      if (idx === trIndex) {
                                        return !item;
                                      } else {
                                        return item;
                                      }
                                    }
                                  );

                                setKeyboardSyncIndividEventBoolean(
                                  newKeyboardSyncIndividEventBoolean
                                );
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (
                                  keyboardSyncIndividEventBoolean[trIndex] ===
                                  false
                                ) {
                                  const newKeyboardSyncIndividEventBoolean =
                                    keyboardSyncIndividEventBoolean.map(
                                      (item, idx) => {
                                        if (idx === trIndex) {
                                          return !item;
                                        } else {
                                          return item;
                                        }
                                      }
                                    );

                                  setKeyboardSyncIndividEventBoolean(
                                    newKeyboardSyncIndividEventBoolean
                                  );
                                  setCheckArray([...checkArray, tbody]);
                                } else if (
                                  keyboardSyncIndividEventBoolean[trIndex] ===
                                  true
                                ) {
                                  const newKeyboardSyncIndividEventBoolean =
                                    keyboardSyncIndividEventBoolean.map(
                                      (item, idx) => {
                                        if (idx === trIndex) {
                                          return !item;
                                        } else {
                                          return item;
                                        }
                                      }
                                    );

                                  setKeyboardSyncIndividEventBoolean(
                                    newKeyboardSyncIndividEventBoolean
                                  );
                                  setCheckArray((array) => {
                                    if (
                                      array.some(
                                        (seq) => seq.rowId === tbody.rowId
                                      )
                                    ) {
                                      // 이미 멤버에 있으면
                                      const removeList = array.filter(
                                        (seq) => seq.rowId !== tbody.rowId
                                      );
                                      return [...removeList];
                                    } else {
                                      return checkArray;
                                    }
                                  });
                                }
                              }
                            }}
                          />
                          <span className="screen_out">
                            {/* @ts-ignore */}
                            {tbody[itemTitle] + " 선택"}
                          </span>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={thead.value}
                          style={{
                            textAlign: thead.align,
                          }}
                        >
                          {/* @ts-ignore */}
                          {thead.accessFn
                            ? thead.accessFn(data[trIndex], trIndex)
                            : // @ts-ignore
                              tbody[thead.value]}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    ) : (
      <table
        className={`${style.tb_st2} ${
          tableEleHeight && tableEleHeight === "small" ? style.small : ""
        }`}
        ref={ref}
      >
        <colgroup>
          <col
            width={
              headers.length > 0 && headers[0].width ? headers[0].width : "auto"
            }
          />
          <col
            width={headers.length > 0 && headers[1] ? headers[1].width : "auto"}
          />
        </colgroup>
        <caption>{tableCaption}</caption>
        <tbody>
          {data.length === 0 ? (
            <tr className={style.no_data}>
              <td colSpan={headers.length}>데이터가 없습니다.</td>
            </tr>
          ) : (
            headers.map((thead: TableHeader, trIndex: number) => {
              return (
                <tr key={`tr_${trIndex}`}>
                  <th>{thead.name}</th>
                  <td
                    style={{
                      textAlign: thead.align,
                    }}
                  >
                    {data.length === 0
                      ? thead.accessFn
                        ? thead.accessFn(headers[trIndex], trIndex)
                        : ""
                      : data.map((tbody: T, index: number) => {
                          return (
                            <React.Fragment key={`${trIndex}_${index}`}>
                              {/* @ts-ignore */}
                              {thead.accessFn
                                ? thead.accessFn(data[index], index)
                                : // @ts-ignore
                                  tbody[thead.value]}
                            </React.Fragment>
                          );
                        })}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    );
  }
);

Table.displayName = "Table";
export default Table as <T extends {}>(
  props: TableProps<T> & {
    ref: Ref<HTMLTableElement | HTMLButtonElement | HTMLButtonElement[]>;
  }
) => JSX.Element;
