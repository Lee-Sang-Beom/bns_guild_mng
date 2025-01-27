import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { CommunityFormRegisterRequest } from "@/types/haveSession/dashboard/community/request";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

/**
 * @name addCollectionCommunity
 * @param data
 * @description 커뮤니티 등록
 */
export async function addCollectionCommunity(
  data: CommunityFormRegisterRequest
): Promise<ApiResponse<string | null>> {
  try {
    // Firestore에 새로운 유저 추가
    const docRef = await addDoc(collection(db, "collection_community"), data);

    return {
      success: true,
      message: "커뮤니티 등록이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "커뮤니티 등록 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
/**
 * @name modifyCollectionCommunity
 * @param data
 * @description 커뮤니티 수정
 */
export async function modifyCollectionCommunity(
  docId: string,
  data: Partial<CommunityFormRegisterRequest>
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_community", docId);
    await updateDoc(docRef, data);

    return {
      success: true,
      message: "커뮤니티 수정이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "커뮤니티 수정 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name deleteCollectionCommunity
 * @param id 삭제할 문서 ID
 * @description 특정 ID의 커뮤니티 정보를 삭제
 */
export async function deleteCollectionCommunity(
  docId: string
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_community", docId);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "커뮤니티 삭제가 완료되었습니다.",
      data: null,
    };
  } catch (e) {
    console.error("Error deleting document: ", e);
    return {
      success: false,
      message: "커뮤니티 삭제 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
