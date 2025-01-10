import { GenderType, UserAuthType } from "@/types/common/commonType";

export type DistributionStepType =
  | "TRANSACTION_REGISTRATION"
  | "TRANSACTION_COMPLETED"
  | "DISTRIBUTION_COMPLETED";
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
   * @name price
   * @description 물품 가격
   */
  price: string | number;

  /**
   * @name distributionUserList
   * @description 분배받을 유저 리스트
   */
  distributionUserList: string[];

  /**
   * @name transactionRegisteredAt
   * @description 거래등록 일시
   */
  transactionRegisteredAt: string | null;

  /**
   * @name transactionCompletedAt
   * @description 거래완료 일시
   */
  transactionCompletedAt: string | null;

  /**
   * @name distributionCompletedAt
   * @description 분배완료 일시
   */
  distributionCompletedAt: string | null;
}
