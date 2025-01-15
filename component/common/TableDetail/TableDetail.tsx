"use client";

import React, { Ref } from "react";
import ms from "./TableDetail.module.scss";
import "@/styles/Editor.scss";

interface TableDetailProps {
  title: string; // 제목
  content: any; // 설명
  writerId: string; // 작성자
  children: React.ReactNode;
}

const TableDetail = React.forwardRef(
  (
    { title, content, writerId, children }: TableDetailProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div className={ms.wrap}>
        {/* TOP */}
        <div className={ms.top}>
          <p className={ms.title}>게시글 정보</p>
          <table className={ms.table}>
            <colgroup>
              <col width={"200px"} />
              <col width={"auto"} />
            </colgroup>
            <caption className="screen_out">공지사항 상세</caption>
            <tbody>
              <tr>
                <th>제목</th>
                <td>{title}</td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{writerId}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <div
                    className="ck ck-content"
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* BOTTOM */}
        <div className={ms.bottom}>{children}</div>
      </div>
    );
  }
);

TableDetail.displayName = "TableDetail";
export default TableDetail as (
  props: TableDetailProps & { ref: Ref<HTMLDivElement> }
) => JSX.Element;
