import { TablePageRequest } from "@/types/common/commonType";
import { Timestamp } from "firebase/firestore";

/**
 * @name CommunityType
 * @description 커뮤니티 페이지 탭 종류 (아트워크, 정보게시판)
 */
export type CommunityType = "ARTWORK" | "INFO";

/**
 * @name CommunityRequest
 * @description 분배정보 조회 페이징 요청
 */
export interface CommunityRequest extends TablePageRequest {
  searchType: CommunityType;
  searchKeyWord: string;
}

/**
 * @name CommunityFormRegisterRequest
 * @description 커뮤니티 등록 Form
 */
export interface CommunityFormRegisterRequest {
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

  /**
   * @name docType
   * @description 커뮤니티 내 문서타입
   */
  docType: CommunityType;
}
