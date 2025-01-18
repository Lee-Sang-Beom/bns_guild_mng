"use client";
import { useForm } from "react-hook-form";
import ms from "./InfoSubUserManageDialog.module.scss";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import { jobList, userAuthList } from "@/datastore/common/common";
import { UserAuthType } from "@/types/common/commonType";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { SubUserManageRequest } from "@/types/haveSession/dashboard/dashboard/request";
import { Session, User } from "next-auth";
import {
  addCollectionSubUser,
  deleteCollectionSubUser,
  modifyCollectionSubUser,
  modifyCollectionUser,
} from "@/utils/haveSession/dashboard/dashboard/action";
import { useSession } from "next-auth/react";
import { encryptPassword } from "@/utils/common/common";
import { useGetSubUserList } from "@/hooks/dashboard/useGetSubUserList";
import { SubUserDocResponse } from "@/types/haveSession/dashboard/dashboard/response";
import { FaDeleteLeft } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function InfoSubUserManageDialog({ session, setOpen }: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();
  const { data, isLoading } = useGetSubUserList(session.user.id);
  const [selectSubUser, setSelectSubUser] = useState<SubUserDocResponse | null>(
    null
  );
  const queryClient = useQueryClient();

  const defaultValues: SubUserManageRequest = {
    parentId: session.user.id,
    id: "",
    job: "검사",
    authType: "MEMBER",
  };

  const {
    register,
    getValues,
    setValue,
    control,
    setError,
    reset,
    handleSubmit,
    watch,
    formState: {
      // isSubmitting: 양식이 현재 제출중인가?
      isSubmitting,
      isSubmitted,
      errors,
    },
  } = useForm<SubUserManageRequest>({
    mode: "all",
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: SubUserManageRequest) => {
    if (selectSubUser) {
      try {
        const res = await modifyCollectionSubUser(data, selectSubUser.docId);
        if (!res) {
          setText("수정요청 처리 중 문제가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
        }
        if (res.success) {
          setText(res.message);
          setIsChange(true);
          setStatus("success");

          reset();
          setSelectSubUser(null);
          queryClient.invalidateQueries({
            queryKey: ["useGetSubUserList", session.user.id], // 팝업 내 서브캐릭터 리스트
          });
          queryClient.invalidateQueries({
            queryKey: ["useGetJobDistributionList"], // 직업 분포 쿼리
          });
          queryClient.invalidateQueries({
            queryKey: ["useGetActiveUserList"], // 조직도 본 캐릭터 리스트
          });
          queryClient.invalidateQueries({
            queryKey: ["useGetActiveSubUserList"], // 조직도 서브 캐릭터 리스트
          });
        } else {
          setText(res.message || "작업 처리 중 문제가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
        }
      } catch (error: any) {
        setText(error || "작업 처리 중 문제가 발생했습니다.");
        setIsChange(true);
        setStatus("error");
      }
    } else {
      try {
        const res = await addCollectionSubUser(data);
        if (!res) {
          setText("서브캐릭터 추가 처리 중 문제가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
        }
        if (res.success) {
          setText(res.message);
          setIsChange(true);
          setStatus("success");

          reset();
          setSelectSubUser(null);
          queryClient.invalidateQueries({
            queryKey: ["useGetSubUserList", session.user.id], // 팝업 내 서브캐릭터 리스트
          });
          queryClient.invalidateQueries({
            queryKey: ["useGetJobDistributionList"], // 직업 분포 쿼리
          });
          queryClient.invalidateQueries({
            queryKey: ["useGetActiveUserList"], // 조직도 본 캐릭터 리스트
          });
          queryClient.invalidateQueries({
            queryKey: ["useGetActiveSubUserList"], // 조직도 서브 캐릭터 리스트
          });
        } else {
          setText(
            res.message || "서브캐릭터 추가 처리 중 문제가 발생했습니다."
          );
          setIsChange(true);
          setStatus("error");
        }
      } catch (error: any) {
        setText(error || "서브캐릭터 추가 처리 중 문제가 발생했습니다.");
        setIsChange(true);
        setStatus("error");
      }
    }
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  return (
    <React.Fragment>
      <Loading
        text={
          isLoading
            ? "서브캐릭터 리스트를 불러오고 있습니다."
            : isSubmitting
            ? "정보를 제출중입니다..."
            : ""
        }
        open={isLoading || isSubmitting}
      />
      <div className={ms.wrap}>
        {/* TOP */}
        <div className={ms.top}>
          <p className={ms.title}>내 서브캐릭터 목록</p>
          {data && data.length > 0 ? (
            <div className={ms.card_wrap}>
              {data.map((user: SubUserDocResponse) => {
                const authName = userAuthList.find(
                  (auth) => user.authType === auth.value
                )!.name;
                return (
                  <div className={ms.card_box} key={user.id}>
                    <button
                      className={ms.info_card_btn}
                      onClick={() => {
                        setValue("id", user.id);
                        setValue("job", user.job);
                        setValue("authType", user.authType);

                        setSelectSubUser(user);
                      }}
                    >
                      <p>
                        <span className={ms.key}>닉네임</span>
                        <span className={ms.value}>{user.id}</span>
                      </p>
                      <p>
                        <span className={ms.key}>직업</span>
                        <span className={ms.value}>{user.job}</span>
                      </p>
                      <p>
                        <span className={ms.key}>권한</span>
                        <span className={ms.value}>{authName}</span>
                      </p>
                    </button>
                    <button
                      className={ms.del_card_btn}
                      onClick={async () => {
                        try {
                          const res = await deleteCollectionSubUser(user.docId);
                          setText(res.message);
                          setIsChange(true);
                          setStatus("success");
                          queryClient.invalidateQueries({
                            queryKey: ["useGetSubUserList", session.user.id], // 팝업 내 서브캐릭터 리스트
                          });
                          queryClient.invalidateQueries({
                            queryKey: ["useGetJobDistributionList"], // 직업 분포 쿼리
                          });
                          queryClient.invalidateQueries({
                            queryKey: ["useGetActiveUserList"], // 조직도 본 캐릭터 리스트
                          });
                          queryClient.invalidateQueries({
                            queryKey: ["useGetActiveSubUserList"], // 조직도 서브 캐릭터 리스트
                          });
                          reset();
                          setSelectSubUser(null);
                        } catch (error: any) {
                          setText(error || "작업 처리 중 문제가 발생했습니다.");
                          setIsChange(true);
                          setStatus("error");
                        }
                      }}
                    >
                      <FaDeleteLeft
                        size={16}
                        role="img"
                        aria-label="삭제아이콘"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={ms.no_user}>
              <img src="/img/no_user.jpg" alt="농담곰 슬픈이미지" />
              등록한 서브캐릭터가 없습니다.
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div className={ms.bottom}>
          {/* TOP */}
          <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={ms.inner}>
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

                {/* 문파 권한 */}
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
                {selectSubUser ? (
                  <>
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
                    <Button
                      color={"red_reverse"}
                      title={"선택 취소"}
                      id={"modifiy"}
                      size="lg"
                      onClick={(e) => {
                        setSelectSubUser(null);
                        reset();
                      }}
                    >
                      선택 취소
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color={"blue"}
                      title={"추가"}
                      id={"add"}
                      size="lg"
                      type="submit"
                      disabled={isSubmitting ? true : false}
                      onClick={(e) => {}}
                    >
                      추가
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SubmitForm>
        </div>
      </div>
    </React.Fragment>
  );
}
