import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

// 회원 승인 함수
export async function approvalCollectionUser(
  user: UserResponse
): Promise<ApiResponse<string | null>> {
  const userDocRef = doc(db, "collection_user", user.docId);

  const { docId, ...newUser } = { ...user, useYn: "Y" };

  try {
    await updateDoc(userDocRef, newUser);
    return {
      success: true,
      message: "회원 승인이 완료되었습니다.",
      data: userDocRef.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "회원 승인 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

// 회원 탈퇴 함수
export async function withdrawCollectionUser(
  user: UserResponse
): Promise<ApiResponse<string | null>> {
  const userDocRef = doc(db, "collection_user", user.docId);

  try {
    await deleteDoc(userDocRef);
    return {
      success: true,
      message: "승인요청 반려가 완료되었습니다.",
      data: userDocRef.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "승인요청 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
