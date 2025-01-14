import { TablePageRequest } from "@/types/common/commonType";
import { Timestamp } from "firebase/firestore";

/**
 * @name NoticeRequest
 * @description 공지사항 조회 페이징 요청
 */
export interface NoticeRequest extends TablePageRequest {
  searchKeyWord: string;
}

/**
 * @name NoticeResponse
 * @description 공지사항 조회 응답
 */
export interface NoticeResponse {
  /**
   * @name writerId
   * @description 작성자 아이디
   */
  writerId: string;

  /**
   * @name docId
   * @description firebase 문서번호
   */
  docId: string;

  /**
   * @name title
   * @description 공지사항 타이틀
   */
  title: string;

  /**
   * @name content
   * @description 공지사항 내용
   */
  content: string;

  /**
   * @name regDt
   * @description 등록일
   */
  regDt: Timestamp;
}

export interface NoticeFormRegisterRequest {
  /**
   * @name writerId
   * @description 작성자 아이디
   */
  writerId: string;

  /**
   * @name title
   * @description 공지사항 타이틀
   */
  title: string;

  /**
   * @name content
   * @description 공지사항 내용
   */
  content: string;

  /**
   * @name regDt
   * @description 등록일
   */
  regDt: Timestamp | null;
}
