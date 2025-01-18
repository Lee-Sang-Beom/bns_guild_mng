import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import { FindPwUserStep1Request } from "@/types/doNotHaveSession/findPw/request";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { encryptPassword } from "@/utils/common/common";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "next-auth";

/**
 * @name getCollectionUserByDetails
 * @param data 비밀번호 찾기를 위해 입력한 유저 정보
 * @description 비밀번호 찾기 (실질적 쿼리 발생)
 */
async function getCollectionUserByDetails(data: FindPwUserStep1Request) {
  try {
    const q = query(
      collection(db, "collection_user"),
      where("id", "==", data.id),
      where("authType", "==", data.authType),
      where("job", "==", data.job),
      where("gender", "==", data.gender),
      where("userBirth", "==", data.userBirth)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const responseData: UserResponse = {
        docId: doc.id,
        ...(doc.data() as User),
      };
      return responseData; // 문서 ID 포함
    }

    return null; // 일치하는 사용자가 없음
  } catch (e) {
    console.error("Error fetching user by details: ", e);
    throw new Error("Failed to fetch user by details");
  }
}

/**
 * @name findCollectionUser
 * @param data 비밀번호 찾기를 위해 입력한 유저 정보
 * @description 비밀번호 찾기
 */
export async function findCollectionUser(
  data: FindPwUserStep1Request
): Promise<ApiResponse<User | null>> {
  try {
    const existingUser = await getCollectionUserByDetails(data);
    if (!existingUser) {
      // 동일 유저가 존재하지 않으면, 회원가입조차 안되었다는 뜻
      return {
        success: false,
        message: "조회된 사용자가 없습니다.",
        data: null,
      };
    } else {
      const { docId, ...user } = existingUser;
      return {
        success: true,
        message:
          "요청한 정보에 대한 사용자가 조회되어, 다음 단계로 이동합니다.",
        data: user,
      };
    }
  } catch (e) {
    return {
      success: false,
      message: "비밀번호 찾기 과정 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name modifyPasswordCollectionUser
 * @param data 유저 정보
 * @description 개인정보 중 패스워드를 수정
 */
export async function modifyPasswordCollectionUser(
  data: User
): Promise<ApiResponse<string | null>> {
  const { password, ...step1Data } = data;

  try {
    /**
     * @name STEP1
     * @description 패스워드 제외, 한 번 더 유저 확인
     */
    const existingUser = await getCollectionUserByDetails(step1Data);
    if (!existingUser) {
      return {
        success: false,
        message: "현재 변경하기를 희망하는 유저 정보를 찾지 못했습니다.",
        data: null,
      };
    }

    /**
     * @name STEP2
     * @description 새로 덮어쓸 유저정보 정의
     */
    const updatedUser = {
      ...data,
      password: encryptPassword(data.password),
    };

    /**
     * @name STEP3
     * @description Firestore에서 기존 문서를 업데이트
     */
    const docRef = doc(db, "collection_user", existingUser.docId);
    await updateDoc(docRef, updatedUser);

    return {
      success: true,
      message: "새 비밀번호 설정이 완료되었습니다.",
      data: existingUser.docId,
    };
  } catch (e) {
    console.error("Error modify user: ", e);
    return {
      success: false,
      message: "새 비밀번호를 설정하는 과정에서 오류가 발생했습니다.",
      data: null,
    };
  }
}
