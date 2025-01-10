"use client";
import { useForm } from "react-hook-form";
import ms from "./DistributionInfomationRegistrationDialog.module.scss";
import {
  onlyNumberReactHookFormOption,
  passwordReactHookFormOption,
} from "@/utils/vaildation/reactHookFormReturnOption/option";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import { genderList, jobList, userAuthList } from "@/datastore/common/common";
import {
  ApiResponse,
  GenderType,
  UserAuthType,
} from "@/types/common/commonType";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { ModifyUserRequest } from "@/types/haveSession/dashboard/dashboard/request";
import { Session, User } from "next-auth";
import { modifyCollectionUser } from "@/utils/haveSession/dashboard/dashboard/action";
import { useSession } from "next-auth/react";
import {
  encryptPassword,
  insertFormatToString,
  removeFormatToString,
} from "@/utils/common/common";
import {
  DistributionInfomationRegistrationRequest,
  DistributionStepType,
} from "@/types/haveSession/dashboard/cashshare/request";
import { distributionStepList } from "@/datastore/dashboard/cashshare/cashshare";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DistributionInfomationRegistrationDialog({
  session,
  setOpen,
}: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();

  const [distributionUserList, setDistributionUserList] = useState<string[]>(
    []
  );

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
  } = useForm<DistributionInfomationRegistrationRequest>({
    mode: "all",
    defaultValues: {
      step: "TRANSACTION_REGISTRATION",
      sellerId: session.user.id,
      itemName: "",
      price: insertFormatToString("NUMBER", Number(0)),
      distributionUserList: [session.user.id],

      transactionRegisteredAt: null,
      transactionCompletedAt: null,
      distributionCompletedAt: null,
    },
  });

  const onSubmit = async (data: DistributionInfomationRegistrationRequest) => {
    const postData = {
      ...data,
      price: removeFormatToString("NUMBER", data.price.toString()),
    };
    console.log("postData is ", postData);
    // await modifyCollectionUser(data, session.user.id)
    //   .then(async (res) => {
    //     // res가 아예 없는 경우 : 로그인 중 응답 오류
    //     if (!res) {
    //       setText("분배 정보 등록 중 오류가 발생했습니다.");
    //       setIsChange(true);
    //       setStatus("error");
    //       return;
    //     }
    //     if (res.success) {
    //       setText("저장되었습니다.");
    //       setIsChange(true);
    //       setStatus("success");
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 500);
    //     } else {
    //       setText(res.message || "분배 정보 등록 중 오류가 발생했습니다.");
    //       setIsChange(true);
    //       setStatus("error");
    //     }
    //   })
    //   .catch((error) => {
    //     setText("분배 정보 등록 중 오류가 발생했습니다.");
    //     setIsChange(true);
    //     setStatus("error");
    //     return;
    //   });
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

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
                      setValue("price", 0);
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
                />
              </div>

              {/* 물품 가격 */}
              {watch("step") != "TRANSACTION_REGISTRATION" && (
                <div className={ms.inp_box}>
                  <span className={ms.label}>판매 물품 총 가격</span>
                  <Input
                    {...register("price", onlyNumberReactHookFormOption(true))}
                    type="text"
                    placeholder="판매 물품 총 가격을 입력해주세요."
                    aria-invalid={
                      isSubmitted
                        ? errors.price
                          ? "true"
                          : "false"
                        : undefined
                    }
                    title="판매 물품 총 가격"
                    id="price"
                    onFocus={(e) => {
                      setValue(
                        "price",
                        removeFormatToString("NUMBER", watch("price")),
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    onBlur={(e) => {
                      setValue(
                        "price",
                        insertFormatToString("NUMBER", watch("price")),
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

                      setValue("price", inputValue, {
                        shouldValidate: true,
                      });
                    }}
                    partialErrorObj={errors.price}
                  />
                </div>
              )}

              {/* 분배 파티원 목록 */}
              {distributionUserList.map((dUser: string) => {
                return (
                  <div key={dUser} className={ms.inp_dynamic_row_box}></div>
                );
              })}

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
