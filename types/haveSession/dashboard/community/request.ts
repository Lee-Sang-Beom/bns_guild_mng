import { TablePageRequest } from "@/types/common/commonType";

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
