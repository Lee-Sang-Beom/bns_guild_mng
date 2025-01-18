"use client";

import { useForm } from "react-hook-form";
import ms from "./FindPw.module.scss";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Link from "next/link";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import { genderList, jobList, userAuthList } from "@/datastore/common/common";
import { GenderType, UserAuthType } from "@/types/common/commonType";
import React, { Dispatch, SetStateAction } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { FindPwUserStep1Request } from "@/types/doNotHaveSession/findPw/request";
import { findCollectionUser } from "@/utils/doNotHaveSession/findPw/action";
import { User } from "next-auth";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";

interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
  setFindUser: Dispatch<SetStateAction<User | null>>;
}
export default function FindPwStep1({ setStep, setFindUser }: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();

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
  } = useForm<FindPwUserStep1Request>({
    mode: "all",
    defaultValues: {
      id: "",
      authType: "MEMBER",
      job: "검사",
      gender: "MALE",
      userBirth: "",
    },
  });

  const onSubmit = async (data: FindPwUserStep1Request) => {
    await findCollectionUser(data)
      .then((res) => {
        if (!res) {
          setText(
            "비밀번호 찾기에 대한 응답을 불러오는 중 오류가 발생했습니다."
          );
          setIsChange(true);
          setStatus("error");
          return;
        }

        if (res.success) {
          setText(res.message);
          setIsChange(true);
          setStatus("success");

          setFindUser(res.data);
          setStep(2);
        } else {
          setText(
            res.message ||
              "입력한 정보에 대한 사용자 정보를 불러오지 못했습니다."
          );
          setIsChange(true);
          setStatus("error");
        }
      })
      .catch((error) => {
        setText("비밀번호 찾기에 대한 응답을 불러오는 중 오류가 발생했습니다.");
        setIsChange(true);
        setStatus("error");

        setFindUser(null);
        setStep(1);
        return;
      });
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  return (
    <React.Fragment>
      <Loading
        text="비밀번호 찾기를 위한 사용자 정보를 조회하고 있습니다."
        open={isSubmitting}
      />

      <div className={ms.section}>
        <div className={ms.inner}>
          {/* TOP */}
          <div className={ms.top}>
            <p className={ms.title}>비밀번호 찾기</p>
            <p className={ms.desc}>
              <span>
                비밀번호 재설정을 진행하기 위해 회원가입이 완료된 적합한
                사용자인지 확인하는 단계입니다.
              </span>
              <span>
                기억나지 않는 비밀번호를 제외하고, 가입한 사용자 정보를
                입력해주세요.
              </span>
            </p>
          </div>

          {/* MIDDLE */}
          <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={ms.middle}>
              {/* 닉네임 */}
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  닉네임 <span className="essential">*</span>
                </span>
                <Input
                  {...register("id", {
                    required: "블소 인게임 닉네임을 입력해주세요.",
                  })}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  aria-invalid={
                    isSubmitted ? (errors.id ? "true" : "false") : undefined
                  }
                  title="닉네임"
                  id="id"
                  partialErrorObj={errors.id}
                  inpSize="md"
                />
              </div>

              <div className={ms.flexbox}>
                {/* 성별 */}
                <div className={ms.inp_box}>
                  <span className={ms.label}>
                    성별 <span className="essential">*</span>
                  </span>
                  <Selectbox
                    {...register("gender", {
                      required: "성별을 선택해주세요.",
                    })}
                    items={genderList}
                    placeholder="성별 선택"
                    title="성별 선택"
                    color="white"
                    size="md"
                    onChange={function (event: SelectChangeEvent): void {
                      const targetValue = event.target.value as GenderType;
                      setValue("gender", targetValue, {
                        shouldValidate: true,
                      });
                    }}
                    value={watch("gender")}
                  />
                </div>

                {/* 생년월일 */}
                <div className={ms.inp_box}>
                  <span className={ms.label}>
                    생년월일 <span className="essential">*</span>
                  </span>
                  <Input
                    {...register("userBirth", {
                      required: "생년월일 선택은 필수입니다.",
                    })}
                    type="date"
                    aria-invalid={
                      isSubmitted
                        ? errors.userBirth
                          ? "true"
                          : "false"
                        : undefined
                    }
                    // 별도 컴포넌트 기능
                    title="userBirth"
                    inpSize={"md"}
                    partialErrorObj={errors.userBirth}
                  />
                </div>
              </div>

              <div className={ms.flexbox}>
                {/* 직업 */}
                <div className={ms.inp_box}>
                  <span className={ms.label}>
                    직업 <span className="essential">*</span>
                  </span>
                  <Selectbox
                    {...register("job", {
                      required: "인게임 직업을 선택해주세요.",
                    })}
                    items={jobList}
                    placeholder="직업 선택"
                    title="직업 선택"
                    color="white"
                    size="md"
                    onChange={function (event: SelectChangeEvent): void {
                      const targetValue = event.target.value;
                      setValue("job", targetValue, {
                        shouldValidate: true,
                      });
                    }}
                    value={watch("job")}
                  />
                </div>

                {/* 권한 */}
                <div className={ms.inp_box}>
                  <span className={ms.label}>
                    문파 권한 <span className="essential">*</span>
                  </span>
                  <Selectbox
                    {...register("authType", {
                      required: "문파 내 권한을 선택해주세요.",
                    })}
                    items={userAuthList}
                    placeholder="권한 선택"
                    title="권한 선택"
                    color="white"
                    size="md"
                    onChange={function (event: SelectChangeEvent): void {
                      const targetValue = event.target.value as UserAuthType;
                      setValue("authType", targetValue, {
                        shouldValidate: true,
                      });
                    }}
                    value={watch("authType")}
                  />
                </div>
              </div>
              <div className={ms.btn_box}>
                <Button
                  color={"blue"}
                  title={"사용자 조회"}
                  id={"submit_step1"}
                  size="lg"
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  onClick={(e) => {}}
                >
                  사용자 조회
                </Button>
              </div>
            </div>
          </SubmitForm>

          {/* BOTTOM */}
          <div className={ms.bottom}>
            <Link href="/login" prefetch={true}>
              로그인 페이지로 이동
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
