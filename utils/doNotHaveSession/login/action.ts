import { ApiResponse } from "@/types/common/commonType";
import { LoginUserRequest } from "@/types/doNotHaveSession/login/request";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/datastore/firebase/firestore";
import { verifyPassword } from "@/utils/common/common";
import { User } from "next-auth";

/**
 * @name getCollectionUserByIdAndPassword
 * @param id 유저 ID
 * @param password 평문 비밀번호
 * @description Firestore에서 특정 ID와 비밀번호를 가진 유저 검색
 * @returns 동일한 ID와 비밀번호를 가진 유저 데이터 또는 null
 */
export async function getCollectionUserByIdAndPassword(
  id: string,
  password: string
): Promise<any | null> {
  try {
    // Firestore에서 해당 ID를 가진 유저 검색
    const q = query(collection(db, "collection_user"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // 동일한 ID를 가진 유저가 없음
    }

    // 유저 데이터 추출
    const userData = querySnapshot.docs[0].data();

    // 비밀번호 검증
    const isPasswordMatch = verifyPassword(password, userData.password); // 암호화된 비밀번호와 비교
    if (isPasswordMatch) {
      return userData; // ID와 비밀번호가 일치하는 유저 반환
    }

    return null; // 비밀번호 불일치
  } catch (e) {
    console.error("Error fetching user by ID and password: ", e);
    throw new Error("Failed to fetch user by ID and password");
  }
}

/**
 * @name loginCollectionUser
 * @param data 로그인 유저 정보
 * @description 로그인
 */
export async function loginCollectionUser(
  data: LoginUserRequest
): Promise<ApiResponse<User | null>> {
  try {
    // 동일한 ID, PW를 가진 유저 정보가 DB에 있는지 확인
    const existingUser: User = await getCollectionUserByIdAndPassword(
      data.id,
      data.password
    );

    /**
     * @if 유저 정보 있을 때
     *  @if useYn == "Y" 활성화된 계정
     *  @else useYn == "N" 비활성화된 계정
     *
     * @else 유저 정보 없을 때
     */
    if (existingUser) {
      if (existingUser.useYn == "Y") {
        // 활성화 (로그인 성공)
        return {
          success: true,
          message: "로그인이 성공하였습니다.",
          data: existingUser,
        };
      } else {
        // 비활성화
        return {
          success: false,
          message: "관리자에 의해 비활성화된 계정입니다.",
          data: null,
        };
      }
    } else {
      // 로그인할 수 있는 유저 정보가 조회되지 않음
      return {
        success: false,
        message: "아이디와 비밀번호를 다시 확인해주세요.",
        data: null,
      };
    }
  } catch (e) {
    console.error("Error adding user: ", e);
    return {
      success: false,
      message: "로그인 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
