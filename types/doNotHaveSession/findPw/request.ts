import { GenderType, UserAuthType } from "@/types/common/commonType";

/**
 * @name FindPwUserStep1Request
 * @description 비밀번호 찾기 step 1
 */
export interface FindPwUserStep1Request {
  id: string;
  authType: UserAuthType;
  job: string;
  gender: GenderType;
  userBirth: string;
}

/**
 * @name FindPwUserStep2Request
 * @description 비밀번호 찾기 step 2
 */
export interface FindPwUserStep2Request {
  password: string;
  passwordConfirm: string;
}
