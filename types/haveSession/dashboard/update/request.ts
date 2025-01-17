import { TablePageRequest } from "@/types/common/commonType";
import { Timestamp } from "firebase/firestore";

/**
 * @name UpdateRequest
 * @description 공지사항 조회 페이징 요청
 */
export interface UpdateRequest extends TablePageRequest {
  searchKeyWord: string;
}

export interface UpdateFormRegisterRequest {
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
