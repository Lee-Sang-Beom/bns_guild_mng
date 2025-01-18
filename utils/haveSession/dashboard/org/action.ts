import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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
  user: UserResponse,
  tabLocate: "LEFT" | "RIGHT"
): Promise<ApiResponse<string | null>> {
  const userDocRef = doc(db, "collection_user", user.docId);

  try {
    // 서브 유저 삭제 - parentId가 user.id인 문서 삭제
    const subUserRef = collection(db, "collection_sub_user");
    const q = query(subUserRef, where("parentId", "==", user.id));
    const querySnapshot = await getDocs(q);

    // 서브 유저 문서가 있으면 삭제
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // 회원 탈퇴 처리
    await deleteDoc(userDocRef);

    return {
      success: true,
      message:
        tabLocate === "LEFT"
          ? "회원탈퇴가 완료되었습니다."
          : "정상적으로 승인요청을 반려했습니다.",
      data: userDocRef.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "요청 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
