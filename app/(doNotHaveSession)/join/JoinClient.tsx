"use client";

import { useForm } from "react-hook-form";
import ms from "./Join.module.scss";
import { passwordReactHookFormOption } from "@/utils/vaildation/reactHookFormReturnOption/option";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Link from "next/link";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import { genderList, jobList, userAuthList } from "@/datastore/common/common";
import {
  ApiResponse,
  GenderType,
  UserAuthType,
} from "@/types/common/commonType";
import { addCollectionUser } from "@/utils/doNotHaveSession/join/action";
import { AddUserRequest } from "@/types/doNotHaveSession/join/request";
import React, { useState } from "react";
import SuccessJoin from "./SuccessJoin";
import RejectJoin from "./RejectJoin";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";

export default function JoinClient() {
  /**
   * @name isDone
   * @description 회원가입의 진행이 완료되었는가?
   */
  const [isDone, setIsDone] = useState<boolean>(false);
  const [res, setRes] = useState<ApiResponse<string | null> | null>(null);

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
  } = useForm<AddUserRequest>({
    mode: "all",
    defaultValues: {
      id: "",
      password: "",
      authType: "MEMBER",
      job: "검사",
      gender: "MALE",
      useYn: "Y",
    },
  });

  const onSubmit = async (data: AddUserRequest) => {
    const addRequestResponse: ApiResponse<string | null> =
      await addCollectionUser(data);

    // 회원가입 진행 완료 및 res 저장
    setIsDone(true);
    setRes(addRequestResponse);
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  return (
    <React.Fragment>
      <Loading text="회원가입 정보를 제출하고 있습니다." open={isSubmitting} />

      <div className={ms.wrap}>
        <div className={ms.section}>
          {!isDone || !res ? (
            <div className={ms.inner}>
              {/* TOP */}
              <div className={ms.top}>
                <p className={ms.title}>회원가입</p>
                <p className={ms.desc}>
                  시그니처 문파원 내 캐릭터가 아닌 유저는 관리자에 의해 계정이
                  사용 중단될 수 있습니다.
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

                  {/* 비밀번호 */}
                  <div className={ms.inp_box}>
                    <span className={ms.label}>
                      비밀번호 <span className="essential">*</span>
                    </span>
                    <Input
                      {...register(
                        "password",
                        passwordReactHookFormOption(true)
                      )}
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      aria-invalid={
                        isSubmitted
                          ? errors.password
                            ? "true"
                            : "false"
                          : undefined
                      }
                      title="비밀번호"
                      id="password"
                      partialErrorObj={errors.password}
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
                  <div className={ms.btn_box}>
                    <Button
                      color={"blue"}
                      title={"회원가입"}
                      id={"join"}
                      size="lg"
                      type="submit"
                      disabled={isSubmitting ? true : false}
                      onClick={(e) => {}}
                    >
                      회원가입
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
          ) : res.success ? (
            <SuccessJoin />
          ) : (
            <RejectJoin res={res} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
