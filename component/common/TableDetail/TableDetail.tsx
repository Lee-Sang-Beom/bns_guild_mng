"use client";

import React, { Ref } from "react";
import ms from "./TableDetail.module.scss";

interface TableDetailProps {
  title: string; // 제목
  content: any; // 설명
  writerId: string; // 작성자자
}

const TableDetail = React.forwardRef(
  (
    { title, content, writerId }: TableDetailProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <table className={ms.table_detail}>
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
            <td className={ms.editor_td}>
              <div
                className={`${ms.bottom}`}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
);

TableDetail.displayName = "TableDetail";
export default TableDetail as (
  props: TableDetailProps & { ref: Ref<HTMLDivElement> }
) => JSX.Element;
