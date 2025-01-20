import { Timestamp } from "firebase/firestore";
import { CommunityType } from "./request";

export interface CommunityResponse {
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
   * @name docType
   * @description firebase 문서타입
   */
  docType: CommunityType;

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
