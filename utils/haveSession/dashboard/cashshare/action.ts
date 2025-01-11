import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import {
  DistributionInfomationRegistrationRequest,
  FeeType,
} from "@/types/haveSession/dashboard/cashshare/request";
import { addDoc, collection } from "firebase/firestore";

/**
 * @name feeToAmount
 * @description 금, 은, 동을 금액으로 환산
 * @param fee 금, 은, 동 단위의 수수료
 * @returns 금액으로 환산된 수수료 금액
 */
export const feeToAmount = (fee: FeeType): number => {
  const feeInGold = fee.gold + fee.silver / 100 + fee.copper / 10000;
  return feeInGold;
};

/**
 * @name convertToFee
 * @description 금액을 금, 은, 동 단위로 변환
 * @param amount 금액
 * @returns FeeType (gold, silver, copper)
 */
export const convertToFee = (amount: number): FeeType => {
  const gold = Math.floor(amount);
  const silver = Math.floor((amount - gold) * 100);
  const copper = Math.round(((amount - gold) * 100 - silver) * 100);

  return { gold, silver, copper };
};

/**
 * @name calculateFee
 * @description 우편수수료 계산
 * @param price, @param divideCount
 * @returns gold, sliver, copper(number)
 */
export const getCalculateFee = (price: number) => {
  const basicFee = 10 / 10000; // 10동을 금으로 환산
  const additionalFee = price * 0.03; // 판매 금액의 3%
  const maxFee = 100; // 최대 수수료 (100금)

  // 총 수수료
  const totalFee = Math.min(additionalFee, maxFee) + basicFee;

  // 금, 은, 동으로 변환
  const gold = Math.floor(totalFee);
  const silver = Math.floor((totalFee - gold) * 100);
  const copper = Math.round(((totalFee - gold) * 100 - silver) * 100);

  return { gold, silver, copper };
};

export const getDistributionPrice = (totalPrice: number, userCount: number) => {
  // 총 분배금 / 4
  const divideUserCountPrice = totalPrice / userCount;

  // 우편 수수료
  const fee = getCalculateFee(divideUserCountPrice);

  // 우편 수수료를 금액으로 변환
  const feeInAmount = feeToAmount(fee);

  // 인당 분배금 계산 : (총 분배금 / 4) - 우편수수료
  const perUserAmount = divideUserCountPrice - feeInAmount;

  // 인당 분배금도 금, 은, 동 단위로 변환
  const perUserFee = convertToFee(perUserAmount);
  return perUserFee;
};

/**
 * @name addCollectionCashShare
 * @param data 분배 등록 정보 추가
 * @description 분배 등록
 */
export async function addCollectionCashShare(
  data: DistributionInfomationRegistrationRequest
): Promise<ApiResponse<string | null>> {
  try {
    // Firestore에 새로운 유저 추가
    const docRef = await addDoc(collection(db, "collection_cashshare"), data);

    return {
      success: true,
      message: "분배정보 등록이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "분배정보 등록 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
