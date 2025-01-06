import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { AddUserRequest } from "@/types/doNotHaveSession/join/request";
import { encryptPassword } from "@/utils/common/common";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

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
      return querySnapshot.docs[0].data();
    }

    return null; // 동일한 ID를 가진 유저가 없음
  } catch (e) {
    console.error("Error fetching user by ID: ", e);
    throw new Error("Failed to fetch user by ID");
  }
}

/**
 * @name addCollectionUser
 * @param data 회원가입 유저 정보
 * @description 회원가입
 */
export async function addCollectionUser(
  data: AddUserRequest
): Promise<ApiResponse<string | null>> {
  try {
    // 동일한 ID가 있는지 확인
    const existingUser = await getCollectionUserById(data.id);
    if (existingUser) {
      // 동일한 ID가 존재하면 예외 발생
      return {
        success: false,
        message: "이미 같은 아이디를 가진 회원이 존재합니다.",
        data: null,
      };
    }

    // 비밀번호 암호화
    const userWithEncryptedPassword = {
      ...data,
      password: encryptPassword(data.password),
    };

    // Firestore에 새로운 유저 추가
    const docRef = await addDoc(
      collection(db, "collection_user"),
      userWithEncryptedPassword
    );

    return {
      success: true,
      message: "회원가입이 완료되었습니다.",
      data: docRef.id,
    };
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "회원가입 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
