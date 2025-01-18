"use client";

import { useForm } from "react-hook-form";
import ms from "./FindPw.module.scss";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { FindPwUserStep2Request } from "@/types/doNotHaveSession/findPw/request";
import { User } from "next-auth";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import {
  passwordConfirmReactHookFormOption,
  passwordReactHookFormOption,
} from "@/utils/vaildation/reactHookFormReturnOption/option";
import { modifyPasswordCollectionUser } from "@/utils/doNotHaveSession/findPw/action";

interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
  findUser: User | null;
  setFindUser: Dispatch<SetStateAction<User | null>>;
}
export default function FindPwStep2({
  setStep,
  findUser,
  setFindUser,
}: IProps) {
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
  } = useForm<FindPwUserStep2Request>({
    mode: "all",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: FindPwUserStep2Request) => {
    const newUser: User = {
      ...(findUser as User),
      password: data.password,
    };
    await modifyPasswordCollectionUser(newUser)
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

          setStep(3);
        } else {
          setText(res.message || "새 비밀번호 저장 중 오류가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
        }
      })
      .catch((error) => {
        setText("새 비밀번호 저장 중 오류가 발생했습니다.");
        setIsChange(true);
        setStatus("error");

        setStep(2);
        return;
      });
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  useEffect(() => {
    // 비밀번호 변경 시, 자동으로 pwConfirm 유효성을 검사하도록 구성
    setValue("passwordConfirm", watch("passwordConfirm") || "", {
      shouldValidate: true,
    });
  }, [watch("password")]);

  return (
    <React.Fragment>
      <Loading
        text="비밀번호를 변경 중입니다. 잠시만 기다려주세요..."
        open={isSubmitting}
      />

      <div className={ms.section}>
        <div className={ms.inner}>
          {/* TOP */}
          <div className={ms.top}>
            <p className={ms.title}>비밀번호 찾기</p>
            <p className={ms.desc}>
              <span>
                비밀번호 재설정을 진행하는 단계입니다. 새 비밀번호와 비밀번호
                확인란을 입력해주세요.
              </span>
            </p>
          </div>

          {/* MIDDLE */}
          <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={ms.middle}>
              {/* 새 비밀번호 */}
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  새 비밀번호 <span className="essential">*</span>
                </span>
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
                  inpSize="md"
                />
              </div>

              {/* 새 비밀번호 확인 */}
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  새 비밀번호 확인 <span className="essential">*</span>
                </span>
                <Input
                  {...register(
                    "passwordConfirm",
                    passwordConfirmReactHookFormOption(watch("password"), true)
                  )}
                  type="password"
                  placeholder="비밀번호 확인을 진행해주세요."
                  aria-invalid={
                    isSubmitted
                      ? errors.passwordConfirm
                        ? "true"
                        : "false"
                      : undefined
                  }
                  title="비밀번호 확인"
                  id="passwordConfirm"
                  partialErrorObj={errors.passwordConfirm}
                  inpSize="md"
                />
              </div>

              <div className={ms.btn_box}>
                <Button
                  color={"blue"}
                  title={"비밀번호 변경"}
                  id={"submit_step2"}
                  size="lg"
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  onClick={(e) => {}}
                >
                  비밀번호 변경
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
