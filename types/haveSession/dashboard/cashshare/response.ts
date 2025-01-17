import { Timestamp } from "firebase/firestore";
import { DistributionStepType } from "./request";

/**
 * @name CashshareResponse
 * @description 분배정보 조회 응답
 */
export interface CashshareResponse {
  /**
   * @name docId
   * @description firebase 문서번호
   */
  docId: string;

  /**
   * @name step
   * @description 거래단계 : 거래등록, 거래완료, 분배완료
   */
  step: DistributionStepType;

  /**
   * @name sellerId
   * @description 판매자 ID
   */
  sellerId: string;

  /**
   * @name itemName
   * @description 물품 이름
   */
  itemName: string;

  /**
   * @name itemList
   * @description 물품 이름 리스트 (쉼표기준)
   */
  itemList: string[];

  /**
   * @name totalPrice
   * @description 물품 총 가격
   */
  totalPrice: number;

  /**
   * @name distributionPrice
   * @description 분배금 (이건 금/은/동으로 표시할거라 number가 아님)
   */
  distributionPrice: string;

  /**
   * @name distributionUserList
   * @description 분배받을 유저 리스트
   */
  distributionUserList: string[];

  /**
   * @name regDt
   * @description 정보등록 일시
   */
  regDt: Timestamp | null;
}
