"use client";
import ms from "./CommunityDialog.module.scss";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import React, { Dispatch, SetStateAction, useState } from "react";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Timestamp } from "firebase/firestore";
import EditorComponent from "@/component/common/EditorComponent/EditorComponent";
import _ from "lodash";
import { addCollectionNotice } from "@/utils/haveSession/dashboard/notice/action";
import { compressContentImages } from "@/utils/common/common";
import {
  CommunityFormRegisterRequest,
  CommunityType,
} from "@/types/haveSession/dashboard/community/request";
import { addCollectionCommunity } from "@/utils/haveSession/dashboard/community/action";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  docType: CommunityType;
}

export default function RegisterCommunityDialog({
  session,
  setOpen,
  docType,
}: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [regData, setRegData] = useState<CommunityFormRegisterRequest>({
    title: "",
    content: "",
    writerId: session.user.id,
    regDt: null,
    docType: docType,
  });

  const onSubmit = async () => {
    if (!regData.title || !regData.content) {
      setText("제목 및 내용은 필수입력사항입니다.");
      setIsChange(true);
      setStatus("warning");
      return;
    }

    // CKEditor에서 가져온 데이터를 기반으로 이미지 압축
    const contentWithCompressedImages = await compressContentImages(
      regData.content
    );

    const postData: CommunityFormRegisterRequest = {
      ...regData,
      content: contentWithCompressedImages, // 압축된 데이터 저장
      regDt: Timestamp.fromDate(new Date()),
    };

    await addCollectionCommunity(postData)
      .then(async (res) => {
        if (!res) {
          setText("커뮤니티 정보 등록 중 오류가 발생했습니다.");
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
          setText("업로드할 내용의 크기가 허용량을 초과하였습니다.");
          setIsChange(true);
          setStatus("error");
        }
      })
      .catch((error) => {
        setText("커뮤니티 정보 등록 중 오류가 발생했습니다.");

        setIsChange(true);
        setStatus("error");
        return;
      });
  };

  return (
    <React.Fragment>
      <Loading text="커뮤니티 정보를 제출하고 있습니다." open={isLoading} />
      <div className={ms.wrap}>
        <div className={ms.section}>
          <div className={ms.inner}>
            {/* 제목 */}
            <div className={ms.inp_box}>
              <span className={ms.label}>
                제목 <span className="essential">*</span>
              </span>
              <Input
                type="text"
                placeholder="제목을 입력해주세요."
                title="제목"
                id="title"
                inpSize="md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRegData((prev) => {
                    return {
                      ...prev,
                      title: e.target.value,
                    };
                  });
                }}
                value={regData.title}
              />
            </div>

            {/* 내용 */}
            <div className={ms.inp_box}>
              <span className={ms.label}>
                내용
                <span className="essential">*</span>
              </span>
              <EditorComponent
                content={regData.content ? regData.content : ""}
                onContentChange={(value: string) => {
                  setRegData((prev) => {
                    return {
                      ...prev,
                      content: value,
                    };
                  });
                }}
              />
            </div>

            <div className={ms.btn_box}>
              <Button
                color={"blue"}
                title={"등록"}
                id={"register"}
                size="lg"
                type="submit"
                onClick={(e) => {
                  onSubmit();
                }}
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
