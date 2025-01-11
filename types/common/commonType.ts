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
 * @name GenderType
 * @description 성별
 */
export type GenderType = "MALE" | "FEMALE";

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

/**
 * @name ApiResponse
 * @description Api Response 형태
 */
export interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

/**
 * @name MenuItem
 * @description 메뉴 데이터 형태
 */
export interface MenuItem {
  menuNm: string;
  menuSeq: number;
  menuUrl: string;
}

/**
 * @name TablePageRequest
 * @description 테이블 데이터 요청 시 필수요소
 */
export interface TablePageRequest {
  page: number;
  size: number;
  sort: string;
  orderBy: "asc" | "desc";
}

/**
 * @name TablePageResponse
 * @description 테이블 데이터 응답 결과
 */
export interface TablePageResponse<T> {
  content: T;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
