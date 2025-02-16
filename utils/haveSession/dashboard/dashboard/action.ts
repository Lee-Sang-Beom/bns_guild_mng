import { db } from "@/datastore/firebase/firestore";
import { ApiResponse } from "@/types/common/commonType";
import {
  ModifyUserRequest,
  SubUserManageRequest,
} from "@/types/haveSession/dashboard/dashboard/request";
import {
  SubUserDocResponse,
  SubUserResponse,
} from "@/types/haveSession/dashboard/dashboard/response";
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
  setDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { User } from "next-auth";

/**
 * @name getDateString
 * @description 등록일 문자열 반환, 일주일 내 등록되었는지 여부 반환
 * @param regDt
 * @returns dateString, @returns isNew
 */
export function getDashboardDateStringAndIsNew(regDt: Timestamp) {
  const timestamp = regDt;
  const dateString = timestamp
    ? new Date(timestamp.seconds * 1000).toLocaleString()
    : "-";

  // regDt가 1주일 이내인지 확인
  const regDate = new Date(timestamp.seconds * 1000); // 등록일
  const currentDate = new Date(); // 현재

  // 밀리초 단위로 차이 계산
  const differenceInMillis = currentDate.getTime() - regDate.getTime();

  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // 1주일을 밀리초로 변환
  const isNew = differenceInMillis <= oneWeekInMillis;

  return { dateString, isNew };
}

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
 * @name getCollectionSubUserById
 * @param id 유저 ID
 * @description Firestore에서 특정 ID를 가진 collection_sub_user 검색
 * @returns 동일한 ID를 가진 유저 데이터 또는 null
 */
async function getCollectionSubUserById(id: string) {
  try {
    const q = query(
      collection(db, "collection_sub_user"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 문서 ID와 데이터를 반환
      const doc = querySnapshot.docs[0];
      const responseData: SubUserDocResponse = {
        docId: doc.id,
        ...(doc.data() as SubUserResponse),
      };
      return responseData; // 문서 ID 포함
    }

    return null; // 동일한 ID를 가진 유저가 없음
  } catch (e) {
    console.error("Error fetching sub-user by ID: ", e);
    throw new Error("Failed to fetch sub-user by ID");
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

    const existingDiffSubUser: SubUserDocResponse | null =
      await getCollectionSubUserById(data.id);

    if (existingDiffSubUser && existingDiffSubUser.id != currentUserId) {
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

/**
 * @name isDuplicatedUserAndSubUserCollectionById
 * @param id 검사할 ID
 * @param excludeDocId 제외할 문서 ID (optional)
 * @description 주어진 ID가 collection_user 또는 collection_sub_user에서 중복되는지 확인
 */
async function isDuplicatedUserAndSubUserCollectionById(
  id: string,
  excludeDocId?: string
): Promise<boolean> {
  const userCollection = collection(db, "collection_user");
  const subUserCollection = collection(db, "collection_sub_user");

  // Query for both collections
  const queries = [
    query(userCollection, where("id", "==", id)),
    query(subUserCollection, where("id", "==", id)),
  ];

  for (const q of queries) {
    const snapshot = await getDocs(q);
    const isDuplicate = snapshot.docs.some((doc) => doc.id !== excludeDocId);

    if (isDuplicate) {
      return true;
    }
  }

  return false;
}

/**
 * @name addCollectionSubUser
 * @param data 유저 정보
 * @description 서브 유저 추가
 */
export async function addCollectionSubUser(
  data: SubUserManageRequest
): Promise<ApiResponse<string | null>> {
  try {
    const isIdDuplicated = await isDuplicatedUserAndSubUserCollectionById(
      data.id
    );
    if (isIdDuplicated) {
      return {
        success: false,
        message: "중복된 닉네임이 존재합니다.",
        data: null,
      };
    }

    // Firestore에 새로운 유저 추가
    const docRef = await addDoc(collection(db, "collection_sub_user"), data);

    return {
      success: true,
      message: "서브 캐릭터가 성공적으로 추가되었습니다.",
      data: docRef.id,
    };
  } catch (err) {
    console.error("Error adding sub-user:", err);
    return {
      success: false,
      message: "서브 캐릭터 추가 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name modifyCollectionSubUser
 * @param data 유저 정보
 * @param docId 문서 ID
 * @description 서브 유저 수정
 */
export async function modifyCollectionSubUser(
  data: Partial<SubUserManageRequest>,
  docId: string
): Promise<ApiResponse<string | null>> {
  try {
    const isIdDuplicated = await isDuplicatedUserAndSubUserCollectionById(
      data.id!,
      docId
    );
    if (isIdDuplicated) {
      return {
        success: false,
        message: "중복된 ID가 존재합니다.",
        data: null,
      };
    }

    const docRef = doc(db, "collection_sub_user", docId);
    await updateDoc(docRef, data);

    return {
      success: true,
      message: "서브 캐릭터가 성공적으로 수정되었습니다.",
      data: docId,
    };
  } catch (err) {
    console.error("Error modifying sub-user:", err);
    return {
      success: false,
      message: "서브 캐릭터 수정 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * @name deleteCollectionSubUser
 * @param docId 문서 ID
 * @description 서브 캐릭터 삭제
 */
export async function deleteCollectionSubUser(
  docId: string
): Promise<ApiResponse<string | null>> {
  try {
    const docRef = doc(db, "collection_sub_user", docId);
    await deleteDoc(docRef);

    return {
      success: true,
      message: "서브 캐릭터가 성공적으로 삭제되었습니다.",
      data: docId,
    };
  } catch (err) {
    console.error("Error deleting sub-user:", err);
    return {
      success: false,
      message: "서브 캐릭터 삭제 중 오류가 발생했습니다.",
      data: null,
    };
  }
}
