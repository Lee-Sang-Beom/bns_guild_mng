"use client";
import { useForm } from "react-hook-form";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { updateCollectionCashShare } from "@/utils/haveSession/dashboard/cashshare/action";
import { Timestamp } from "firebase/firestore";
import { ScheduleResponse } from "@/types/haveSession/dashboard/schedule/response";
import { ScheduleFormRequest } from "@/types/haveSession/dashboard/schedule/request";
import {
  ButtonBox,
  Inner,
  InputBox,
  Label,
  Section,
  Wrap,
} from "../styles/css-in-js/ScheduleManageDialogStyledComp";
import Textarea from "@/component/common/Textarea/Textarea";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: ScheduleResponse | null;
}
export default function ScheduleManageDialog({
  session,
  setOpen,
  data,
}: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
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
  } = useForm<ScheduleFormRequest>({
    mode: "all",
    defaultValues: {
      docId: data ? data.docId : null,
      writerId: data ? data.writerId : session.user.id,
      content: data ? data.content : "",
      regDt: data ? data.regDt : null,
    },
  });

  const onSubmit = async (formData: ScheduleFormRequest) => {
    let { docId, ...postData } = {
      ...formData,
      regDt: formData.regDt ? formData.regDt : Timestamp.fromDate(new Date()),
    };

    if (docId) {
      // case 수정
      await updateCollectionCashShare(docId, postData)
        .then(async (res) => {
          if (!res) {
            setText("일정 정보 저장 중 오류가 발생했습니다.");
            setIsChange(true);
            setStatus("error");
            return;
          }
          if (res.success) {
            setText("저장되었습니다.");
            setIsChange(true);
            setStatus("success");
            setOpen(false);

            setTimeout(() => {
              router.replace(`/dashboard/schedule`);
              router.refresh();
              setOpen(false);
            }, 500);
          } else {
            setText(res.message || "일정 정보 저장 중 오류가 발생했습니다.");
            setIsChange(true);
            setStatus("error");
          }
        })
        .catch((error) => {
          setText("일정 정보 저장 중 오류가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
          return;
        });
    } else {
      // case 저장
      console.log("저장 ", postData, docId);
    }
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  return (
    <React.Fragment>
      <Loading text="일정 정보를 제출하고 있습니다." open={isSubmitting} />
      <Wrap>
        <Section>
          <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
            <Inner>
              {/* 일정 등록자 */}
              <InputBox as="fieldset">
                <Label htmlFor="writerId">
                  일정 등록자 <span className="essential">*</span>
                </Label>
                <Input
                  {...register("writerId", {
                    required: "일정 등록자 닉네임을 입력해주세요.",
                  })}
                  type="text"
                  placeholder="일정 등록자 닉네임을 입력해주세요."
                  aria-invalid={
                    isSubmitted
                      ? errors.writerId
                        ? "true"
                        : "false"
                      : undefined
                  }
                  disabled
                  title="일정 등록자"
                  id="writerId"
                  partialErrorObj={errors.writerId}
                  inpSize="md"
                />
              </InputBox>

              {/* 일정 내용 */}
              <InputBox as="fieldset">
                <Label htmlFor="content">
                  일정 내용 <span className="essential">*</span>
                </Label>
                <Textarea
                  {...register("content", {
                    required: "일정 내용을 입력해주세요.",
                  })}
                  title={"일정 내용"}
                  placeholder={"일정 내용 입력"}
                  style={{ height: "99px" }}
                  partialErrorObj={errors.content}
                  defaultMultiLine={true}
                  taSize="sm"
                />
              </InputBox>

              {/* 저장 버튼 */}
              <ButtonBox>
                <Button
                  color="blue"
                  title={data ? "수정" : "저장"}
                  id="save"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {}}
                >
                  {data ? "수정" : "저장"}
                </Button>
              </ButtonBox>
            </Inner>
          </SubmitForm>
        </Section>
      </Wrap>
    </React.Fragment>
  );
}
