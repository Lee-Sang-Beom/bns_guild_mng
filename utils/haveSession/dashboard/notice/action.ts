import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { NoticeFormRegisterRequest } from "@/types/haveSession/dashboard/notice/request";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

/**
 * @name addCollectionNotice
 * @param data
 * @description 공지사항 등록
 */
export async function addCollectionNotice(
  data: NoticeFormRegisterRequest
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = await addDoc(collection(db, "collection_notice"), data);

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
 * @name modifyCollectionNotice
 * @param data
 * @description 공지사항 수정
 */
export async function modifyCollectionNotice(
  docId: string,
  data: Partial<NoticeFormRegisterRequest>
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_notice", docId);
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
 * @name deleteCollectionNotice
 * @param id 삭제할 문서 ID
 * @description 특정 ID의 공지사항 정보를 삭제
 */
export async function deleteCollectionNotice(
  docId: string
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_notice", docId);
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
