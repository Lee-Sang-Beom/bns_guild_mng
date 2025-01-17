import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { ModifyUserRequest } from "@/types/haveSession/dashboard/dashboard/request";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { encryptPassword } from "@/utils/common/common";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { User } from "next-auth";
/**
 * @name getCollectionUserById
 * @param id 유저 ID
 * @description Firestore에서 특정 ID를 가진 유저 검색
 * @returns 동일한 ID를 가진 유저 데이터 또는 null
 */
async function getCollectionUserById(id: string) {
  try {
    const q = query(collection(db, "collection_user"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 문서 ID와 데이터를 반환
      const doc = querySnapshot.docs[0];
      const responseData: UserResponse = {
        docId: doc.id,
        ...(doc.data() as User),
      };
      return responseData; // 문서 ID 포함
    }

    return null; // 동일한 ID를 가진 유저가 없음
  } catch (e) {
    console.error("Error fetching user by ID: ", e);
    throw new Error("Failed to fetch user by ID");
  }
}

/**
 * @name modifyCollectionUser
 * @param data 유저 정보
 * @description 개인정보 수정
 */
export async function modifyCollectionUser(
  data: ModifyUserRequest,
  currentUserId: string
): Promise<ApiResponse<string | null>> {
  try {
    /**
     * @name STEP1
     * @description 변경하고자 하는 닉네임을 가진 다른 정보가 DB에 있는지 확인
     */
    const existingDiffUser: UserResponse | null = await getCollectionUserById(
      data.id
    );

    if (existingDiffUser && existingDiffUser.id != currentUserId) {
      return {
        success: false,
        message: "이미 같은 닉네임을 가진 회원이 존재합니다.",
        data: null,
      };
    }

    /**
     * @name STEP2
     * @description 현재 닉네임을 가진 "내 정보"를 DB에서 가져옴
     */
    const existingUser: UserResponse | null = await getCollectionUserById(
      currentUserId
    );
    if (!existingUser) {
      return {
        success: false,
        message: "개인정보 수정 시도 중, 현재 내 정보를 찾지 못했습니다.",
        data: null,
      };
    }

    /**
     * @name STEP3
     * @description 새로 덮어쓸 유저정보 추가
     */
    const updatedUser = {
      ...data,
      password:
        data.password && data.password.length > 0
          ? encryptPassword(data.password) // 새 비밀번호 암호화
          : existingUser.password, // 기존 비밀번호 유지
    };

    /**
     * @name STEP4
     * @description Firestore에서 기존 문서를 업데이트
     */
    const docRef = doc(db, "collection_user", existingUser.docId);
    await updateDoc(docRef, updatedUser);

    return {
      success: true,
      message: "개인정보 수정이 완료되었습니다.",
      data: existingUser.docId,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "개인정보 수정 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
