/**
 * @name StatusType
 * @description AutoAlert 상태
 */
export type StatusType = "success" | "warning" | "info" | "error";

/**
 * @name UserAuthType
 * @description 선택 가능한 유저 권한
 */
export type UserAuthType = "NORMAL" | "ADMIN";

/**
 * @name KeyValue
 * @description key-value 형식의 이름을 그대로 가지는 객체에 사용
 */
export interface KeyValue {
  name: string;
  value: string;
}

/**
 * @name InputErrorMsgType
 * @description 입력요소 유효성 체크
 */
export interface InputErrorMsgType {
  isSuccess: boolean;
  msg: string;
}

/**
 * @name EnumType
 * @description 제네릭 사용 - type 및 name으로 분류
 */
export interface EnumType<T> {
  type: T;
  name: string;
}

export interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}
