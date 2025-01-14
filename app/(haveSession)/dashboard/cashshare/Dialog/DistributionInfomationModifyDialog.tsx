"use client";
import { useForm } from "react-hook-form";
import ms from "./DistributionInfomationRegistrationDialog.module.scss";
import { onlyNumberReactHookFormOption } from "@/utils/vaildation/reactHookFormReturnOption/option";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import {
  insertFormatToString,
  removeFormatToString,
} from "@/utils/common/common";
import {
  CashshareResponse,
  DistributionInfomationModifyRequest,
  DistributionStepType,
  FeeType,
} from "@/types/haveSession/dashboard/cashshare/request";
import { distributionStepList } from "@/datastore/dashboard/cashshare/cashshare";
import {
  addCollectionCashShare,
  getDistributionPrice,
  updateCollectionCashShare,
} from "@/utils/haveSession/dashboard/cashshare/action";
import { Timestamp } from "firebase/firestore";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CashshareResponse;
}
export default function DistributionInfomationModifyDialog({
  session,
  setOpen,
  data,
}: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const [docId] = useState<string>(data.docId);
  const router = useRouter();

  const {
    register,
    getValues,
    setValue,
    control,
    setError,
    handleSubmit,
    watch,
    formState: {
      // isSubmitting: 양식이 현재 제출중인가?
      isSubmitting,
      isSubmitted,
      errors,
    },
  } = useForm<DistributionInfomationModifyRequest>({
    mode: "all",
    defaultValues: {
      step: data.step,
      sellerId: data.sellerId,
      itemName: data.itemName,
      totalPrice: insertFormatToString("NUMBER", data.totalPrice),
      distributionPrice: insertFormatToString("NUMBER", data.distributionPrice),
      distributionUserList: data.distributionUserList,
      regDt: data.regDt,
    },
  });

  const onSubmit = async (data: DistributionInfomationModifyRequest) => {
    const postData: DistributionInfomationModifyRequest = {
      ...data,
      totalPrice: Number(
        removeFormatToString("NUMBER", data.totalPrice.toString())
      ),
      regDt: Timestamp.fromDate(new Date()),
    };
    await updateCollectionCashShare(docId, postData)
      .then(async (res) => {
        if (!res) {
          setText("분배 정보 등록 중 오류가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
          return;
        }
        if (res.success) {
          setText("저장되었습니다.");
          setIsChange(true);
          setStatus("success");

          setTimeout(() => {
            router.refresh();
            setOpen(false);
          }, 500);
        } else {
          setText(res.message || "분배 정보 등록 중 오류가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
        }
      })
      .catch((error) => {
        setText("분배 정보 등록 중 오류가 발생했습니다.");
        setIsChange(true);
        setStatus("error");
        return;
      });
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  /**
   * @name useEffect
   * @description 인당 예상 분배금 계산 : (총 분배금 / 4) - 우편수수료
   */
  useEffect(() => {
    const totalPrice =
      Number(removeFormatToString("NUMBER", watch("totalPrice").toString())) ||
      0;
    const userCount = watch("distributionUserList").length;
    if (totalPrice == 0 || userCount < 1) {
      setValue(
        "distributionPrice",
        insertFormatToString("NUMBER", Number(0)) + "금"
      );
      return;
    }
    const distributionPrice: FeeType =
      userCount == 1
        ? {
            gold: totalPrice,
            silver: 0,
            copper: 0,
          }
        : getDistributionPrice(totalPrice, userCount);

    const distributionPriceToString = `${distributionPrice.gold.toLocaleString()}금 ${
      distributionPrice.silver
    }은 ${distributionPrice.copper}동`;

    setValue("distributionPrice", distributionPriceToString);
  }, [watch("totalPrice"), watch("distributionUserList")]);

  return (
    <React.Fragment>
      <Loading text="분배 등록 정보를 제출하고 있습니다." open={isSubmitting} />
      <div className={ms.wrap}>
        <div className={ms.section}>
          <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={ms.inner}>
              {/* 거래단계 */}
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  거래단계 <span className="essential">*</span>
                </span>
                <Selectbox
                  {...register("step", {
                    required: "거래단계를 선택해주세요.",
                  })}
                  items={distributionStepList}
                  placeholder="거래단계 선택"
                  title="거래단계 선택"
                  color="white"
                  size="md"
                  onChange={function (event: SelectChangeEvent): void {
                    const targetValue = event.target
                      .value as DistributionStepType;

                    setValue("step", targetValue, {
                      shouldValidate: true,
                    });

                    // 거래등록 단계로 변하면, 판매금액이 초기화
                    if (targetValue === "TRANSACTION_REGISTRATION") {
                      setValue(
                        "totalPrice",
                        insertFormatToString("NUMBER", Number(0))
                      );
                      setValue(
                        "distributionPrice",
                        insertFormatToString("NUMBER", Number(0))
                      );
                    }
                  }}
                  value={watch("step")}
                />
              </div>

              {/* 대표 판매자 */}
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  대표 판매자 <span className="essential">*</span>
                </span>
                <Input
                  {...register("sellerId", {
                    required: "대표 판매자 닉네임을 입력해주세요.",
                  })}
                  type="text"
                  placeholder="대표 판매자 닉네임을 입력해주세요."
                  aria-invalid={
                    isSubmitted
                      ? errors.sellerId
                        ? "true"
                        : "false"
                      : undefined
                  }
                  disabled
                  title="대표 판매자"
                  id="sellerId"
                  partialErrorObj={errors.sellerId}
                  inpSize="md"
                />
              </div>

              {/* 판매 물품 */}
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  판매 물품 <span className="essential">*</span>
                </span>
                <Input
                  {...register("itemName", {
                    required: "판매 물품을 입력해주세요.",
                  })}
                  type="text"
                  placeholder="판매 물품을 입력해주세요."
                  aria-invalid={
                    isSubmitted
                      ? errors.itemName
                        ? "true"
                        : "false"
                      : undefined
                  }
                  title="판매 물품"
                  id="itemName"
                  partialErrorObj={errors.itemName}
                  inpSize="md"
                />
              </div>

              {/* 분배 파티원 목록 */}
              <div className={ms.group_box}>
                <span className={ms.label}>
                  파티원 목록<span className="essential">*</span>
                </span>
                {watch("distributionUserList").map(
                  (dUser: string, index: number) => {
                    return (
                      <div className={ms.inp_and_btn_box} key={dUser}>
                        <div className={ms.inp_box}>
                          <Input
                            {...register(`distributionUserList.${index}`, {
                              required: "분배할 파티원 닉네임을 입력해주세요.",
                            })}
                            type="text"
                            placeholder="분배할 파티원 닉네임을 입력해주세요."
                            aria-invalid={
                              errors.distributionUserList?.[index]
                                ? "true"
                                : "false"
                            }
                            disabled
                            defaultValue={dUser} // 초기값 설정
                            title={`분배 파티원 닉네임-${index}`}
                            id={`distributionUserList-${index}`}
                            inpSize="md"
                          />
                        </div>
                        <div
                          className={`${ms.flex_box} ${ms.distribution_user_btn_box}`}
                        >
                          <Button
                            title={"파티원 추가"}
                            id={"add_distribution_user"}
                            onClick={() => {
                              if (watch("distributionUserList").length >= 6) {
                                setText(
                                  "입력 가능한 파티원 수는 최대 6명입니다."
                                );
                                setIsChange(true);
                                setStatus("warning");

                                return;
                              }

                              const newUser = prompt(
                                "추가할 파티원 닉네임을 입력하세요:"
                              );

                              if (newUser) {
                                setValue("distributionUserList", [
                                  ...watch("distributionUserList"),
                                  newUser,
                                ]);
                              }
                            }}
                            color={"blue_reverse"}
                            size="lg"
                          >
                            추가
                          </Button>
                          <Button
                            title={"파티원 삭제"}
                            id={"remove_distribution_user"}
                            onClick={() => {
                              if (dUser === session.user.id) {
                                setText(
                                  "대표 판매자(본인)은 삭제할 수 없습니다."
                                );
                                setIsChange(true);
                                setStatus("warning");

                                return;
                              }
                              const updatedList = watch(
                                "distributionUserList"
                              ).filter((user) => user !== dUser);

                              setValue("distributionUserList", updatedList);
                            }}
                            color={"red_reverse"}
                            size="lg"
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* 물품 가격 */}
              {watch("step") != "TRANSACTION_REGISTRATION" && (
                <div className={ms.flexbox}>
                  <div className={ms.inp_box}>
                    <span className={ms.label}>
                      {`판매 물품 총 가격(금)`}{" "}
                      <span className="essential">*</span>
                    </span>
                    <Input
                      {...register(
                        "totalPrice",
                        onlyNumberReactHookFormOption(true)
                      )}
                      type="text"
                      placeholder="판매 물품 총 가격을 입력해주세요."
                      aria-invalid={
                        isSubmitted
                          ? errors.totalPrice
                            ? "true"
                            : "false"
                          : undefined
                      }
                      title="판매 물품 총 가격"
                      id="totalPrice"
                      onFocus={(e) => {
                        setValue(
                          "totalPrice",
                          removeFormatToString("NUMBER", watch("totalPrice")),
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      onBlur={(e) => {
                        setValue(
                          "totalPrice",
                          insertFormatToString("NUMBER", watch("totalPrice")),
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let inputValue = e.target.value;

                        // 앞의 0 제거
                        if (/^0\d/.test(inputValue)) {
                          inputValue = inputValue.replace(/^0+/, "");
                        }

                        setValue("totalPrice", inputValue, {
                          shouldValidate: true,
                        });
                      }}
                      partialErrorObj={errors.totalPrice}
                      inpSize="md"
                    />
                  </div>

                  <div className={ms.inp_box}>
                    <span
                      className={ms.label}
                    >{`인당 분배금(우편 수수료 계산 포함)`}</span>
                    <Input
                      {...register("distributionPrice")}
                      type="text"
                      placeholder="인당 분배금"
                      disabled
                      aria-invalid={
                        isSubmitted
                          ? errors.distributionPrice
                            ? "true"
                            : "false"
                          : undefined
                      }
                      title="인당 분배금"
                      id="distributionPrice"
                      partialErrorObj={errors.distributionPrice}
                      inpSize="md"
                    />
                  </div>
                </div>
              )}

              <div className={ms.btn_box}>
                <Button
                  color={"blue"}
                  title={"수정"}
                  id={"modifiy"}
                  size="lg"
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  onClick={(e) => {}}
                >
                  수정
                </Button>
              </div>
            </div>
          </SubmitForm>
        </div>
      </div>
    </React.Fragment>
  );
}
