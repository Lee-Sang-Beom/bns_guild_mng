import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { UpdateFormRegisterRequest } from "@/types/haveSession/dashboard/update/request";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

/**
 * @name addCollectionUpdate
 * @param data
 * @description 공지사항 등록
 */
export async function addCollectionUpdate(
  data: UpdateFormRegisterRequest
): Promise<ApiResponse<string | null>> {
  try {
    // Firestore에 새로운 유저 추가
    const docRef = await addDoc(collection(db, "collection_update"), data);

    return {
      success: true,
      message: "공지사항 등록이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "공지사항 등록 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
/**
 * @name modifyCollectionUpdate
 * @param data
 * @description 공지사항 수정
 */
export async function modifyCollectionUpdate(
  docId: string,
  data: Partial<UpdateFormRegisterRequest>
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_update", docId);
    await updateDoc(docRef, data);

    return {
      success: true,
      message: "공지사항 수정이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "공지사항 수정 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name deleteCollectionUpdate
 * @param id 삭제할 문서 ID
 * @description 특정 ID의 공지사항 정보를 삭제
 */
export async function deleteCollectionUpdate(
  docId: string
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_update", docId);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "공지사항 삭제가 완료되었습니다.",
      data: null,
    };
  } catch (e) {
    console.error("Error deleting document: ", e);
    return {
      success: false,
      message: "공지사항 삭제 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
