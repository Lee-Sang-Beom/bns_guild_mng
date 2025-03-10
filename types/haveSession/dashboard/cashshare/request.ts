import { TablePageRequest } from "@/types/common/commonType";
import { Timestamp } from "firebase/firestore";
export interface FeeType {
  gold: number;
  silver: number;
  copper: number;
}

/**
 * @name DistributionStepType
 * @description 분배관리단계 (거래등록, 거래완료, 분배완료)
 */
export type DistributionStepType =
  | "TRANSACTION_REGISTRATION"
  | "TRANSACTION_COMPLETED"
  | "DISTRIBUTION_COMPLETED";

/**
 * @name CashshareSearchType
 * @description 검색어 포함범위 (내가 판매자인것, 내가 판매자가 아니면서 )
 */
export type CashshareSearchType =
  | "SELLER_ID"
  | "INCLUDE_DISTRIBUTION"
  | "ITEM_NAME";

/**
 * @name DistributionInfomationRegistrationRequest
 * @description 등록 - 분배금
 */
export interface DistributionInfomationRegistrationRequest {
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
  totalPrice: string | number;

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
  regDt: string | Timestamp | null;
}

/**
 * @name DistributionInfomationModifyRequest
 * @description 수정 - 분배금
 */
export interface DistributionInfomationModifyRequest {
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
  totalPrice: string | number;

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
  regDt: string | Timestamp | null;
}

/**
 * @name CashshareRequest
 * @description 분배정보 조회 페이징 요청
 */
export interface CashshareRequest extends TablePageRequest {
  stepType: DistributionStepType;
  searchType: CashshareSearchType;
  searchKeyWord: string;
}
