import { UserAuthType } from "@/types/common/commonType";

/**
 * @name SubUserResponse
 * @description 부캐릭터 리스트에 대한 response
 */
export interface SubUserResponse {
  parentId: string; // 본캐릭 아이디
  id: string; // 부캐릭 닉네임
  job: string; // 부캐릭 직업
  authType: UserAuthType; // 부캐릭 권한
}

/**
 * @name SubUserDocResponse
 * @description 부캐릭터 리스트에 대한 docId를 포함한 response
 */
export interface SubUserDocResponse extends SubUserResponse {
  docId: string;
}
