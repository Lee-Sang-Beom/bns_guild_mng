import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { ScheduleFormRequest } from "@/types/haveSession/dashboard/schedule/request";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

/**
 * @name addCollectionSchedule
 * @param data 일정관리 정보 추가
 * @description 일정추가
 */
export async function addCollectionSchedule(
  data: ScheduleFormRequest
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = await addDoc(collection(db, "collection_schedule"), data);

    return {
      success: true,
      message: "일정 정보 등록이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "일정 정보 등록 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name updateCollectionschedule
 * @param docId 수정할 문서 ID
 * @param data 수정할 데이터
 * @description 일정 정보 수정
 */
export async function updateCollectionSchedule(
  docId: string,
  data: Partial<ScheduleFormRequest>
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_schedule", docId);
    await updateDoc(docRef, data);

    return {
      success: true,
      message: "일정 정보 수정이 완료되었습니다.",
      data: null,
    };
  } catch (e) {
    console.error("Error updating document: ", e);
    return {
      success: false,
      message: "일정 정보 수정 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name deleteCollectionSchedule
 * @param id 삭제할 문서 ID
 * @description 특정 ID의 일정 정보를 삭제
 */
export async function deleteCollectionSchedule(
  docId: string
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_schedule", docId);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "일정 정보 삭제가 완료되었습니다.",
      data: null,
    };
  } catch (e) {
    console.error("Error deleting document: ", e);
    return {
      success: false,
      message: "일정 정보 삭제 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
