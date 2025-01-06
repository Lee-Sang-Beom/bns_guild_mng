import { SelectboxType } from "@/component/common/Selectbox/Selectbox";

/**
 * @name userAuthList
 * @description 유저 권한 종류
 */
export const userAuthList: SelectboxType[] = [
  { name: "일반", value: "NORMAL", group: "" },
  { name: "관리자", value: "ADMIN", group: "" },
];
