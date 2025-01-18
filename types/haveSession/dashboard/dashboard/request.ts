import { GenderType, UserAuthType } from "@/types/common/commonType";

/**
 * @name ModifyUserRequest
 * @description 개인정보 수정 시 요청에 해당하는 인터페이스
 */
export interface ModifyUserRequest {
  id: string; // 아이디
  password: string; // 비밀번호
  authType: UserAuthType; // 권한
  job: string; // 직업
  gender: GenderType; // 성별
  useYn: "Y" | "N"; // 사용여부
  userBirth: string; // 생일
}

/**
 * @name SubUserManageRequest
 * @description 부캐릭터 추가 및 수정 시 요청에 해당하는 인터페이스
 */
export interface SubUserManageRequest {
  parentId: string; // 본캐릭 아이디
  id: string; // 부캐릭 닉네임
  job: string; // 부캐릭 직업
  authType: UserAuthType; // 부캐릭 권한
}
