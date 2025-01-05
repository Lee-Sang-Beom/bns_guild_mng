"use client";

import { useForm } from "react-hook-form";
import ms from "./Login.module.scss";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import {
  idReactHookFormOption,
  passwordReactHookFormOption,
} from "@/utils/vaildation/reactHookFormReturnOption/option";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Link from "next/link";

interface IForm {
  id: string;
  password: string;
}

export default function LoginClient() {
  const {
    register,
    getValues,
    setValue,

    // react-hook-form이 내부적으로 사용하는 폼 컨트롤러 객체입니다. 폼 컨트롤러를 사용하여 폼을 더욱 세밀하게 제어할 수 있습니다.
    control,
    setError,
    // handleSubmit: 폼 제출(submit)을 처리하는 함수입니다. 이 함수는 폼의 입력 데이터를 검증하고 처리하는 역할을 합니다.
    handleSubmit,
    watch,
    formState: {
      // isSubmitting: 양식이 현재 제출중인가?
      isSubmitting,
      isSubmitted,
      errors,
    },
  } = useForm<IForm>({
    mode: "all",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: IForm) => {};
  const onError = (errors: any) => {
    console.log("errors ", errors);
  };

  return (
    <div className={ms.wrap}>
      <div className={ms.section}>
        <div className={ms.inner}>
          <div className={ms.top}>
            <p className={ms.title}>로그인</p>
            <p className={ms.desc}>
              회원가입을 진행한 시그니처 문파원만 로그인을 진행할 수 있습니다.
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
              <div className={ms.btn_box}>
                <Button
                  color={"blue"}
                  title={"로그인"}
                  id={"login"}
                  size="lg"
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  onClick={(e) => {}}
                >
                  로그인
                </Button>
              </div>
            </div>
          </SubmitForm>
          <div className={ms.bottom}>
            <Link href="/join" prefetch={false}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
