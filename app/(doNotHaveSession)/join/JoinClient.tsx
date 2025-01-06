"use client";

import { useForm } from "react-hook-form";
import ms from "./Join.module.scss";
import { passwordReactHookFormOption } from "@/utils/vaildation/reactHookFormReturnOption/option";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Link from "next/link";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import { userAuthList } from "@/datastore/common/common";
import { ApiResponse, UserAuthType } from "@/types/common/commonType";
import { addCollectionUser } from "@/utils/doNotHaveSession/join/action";
import { AddUserRequest } from "@/types/doNotHaveSession/join/request";
import { useState } from "react";
import SuccessJoin from "./SuccessJoin";
import RejectJoin from "./RejectJoin";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";

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
      authType: "NORMAL",
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
    <div className={ms.wrap}>
      <div className={ms.section}>
        {!isDone || !res ? (
          <div className={ms.inner}>
            <div className={ms.top}>
              <p className={ms.title}>회원가입</p>
              <p className={ms.desc}>
                시그니처 문파원 내 캐릭터가 아닌 유저는 관리자에 의해 계정이
                사용 중단될 수 있습니다.
              </p>
            </div>
            <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
              <div className={ms.middle}>
                <div className={ms.inp_box}>
                  <span className={ms.label}>닉네임</span>
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
                  />
                </div>
                <div className={ms.inp_box}>
                  <span className={ms.label}>비밀번호</span>
                  <Input
                    {...register("password", passwordReactHookFormOption(true))}
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
                  />
                </div>
                <div className={ms.inp_box}>
                  <span className={ms.label}>권한</span>
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
            <div className={ms.bottom}>
              <Link href="/login" prefetch={false}>
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
  );
}
