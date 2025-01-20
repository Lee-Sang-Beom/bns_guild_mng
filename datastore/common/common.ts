import { SelectboxType } from "@/component/common/Selectbox/Selectbox";
import { MenuItem } from "@/types/common/commonType";

export const homepageAdminUserId = "표현";
/**
 * @name userAuthList
 * @description 유저 권한 종류
 */
export const userAuthList: SelectboxType[] = [
  { name: "문파장", value: "LEADER", group: "" },
  { name: "부문파장", value: "DEPUTY_LEADER", group: "" },
  { name: "문파장로", value: "ELDER", group: "" },
  { name: "문파원", value: "MEMBER", group: "" },
  { name: "연습생", value: "TRAINEE", group: "" },
];

/**
 * @name adminAuthType
 * @description 관리자 유저 권한
 */
type AdminAuthType = "LEADER" | "DEPUTY_LEADER" | "ELDER";
export const adminAuthTypes: AdminAuthType[] = [
  "LEADER",
  "DEPUTY_LEADER",
  "ELDER",
];

/**
 * @name jobList
 * @description 게임 직업 종류
 */
export const jobList: SelectboxType[] = [
  { name: "검사", value: "검사", group: "" },
  { name: "권사", value: "권사", group: "" },
  { name: "역사", value: "역사", group: "" },
  { name: "기공사", value: "기공사", group: "" },
  { name: "암살자", value: "암살자", group: "" },
  { name: "소환사", value: "소환사", group: "" },
  { name: "린검사", value: "린검사", group: "" },
  { name: "주술사", value: "주술사", group: "" },
  { name: "기권사", value: "기권사", group: "" },
  { name: "격사", value: "격사", group: "" },
  { name: "투사", value: "투사", group: "" },
  { name: "궁사", value: "궁사", group: "" },
  { name: "천도사", value: "천도사", group: "" },
  { name: "쌍검사", value: "쌍검사", group: "" },
  { name: "악사", value: "악사", group: "" },
];

export const genderList: SelectboxType[] = [
  { name: "남", value: "MALE", group: "" },
  { name: "여", value: "FEMALE", group: "" },
];
/**
 * @name menuList
 * @description 메뉴 리스트 (필요 시, 차후 서버에서 관리하여 내려줄 수 있도록 할 것임)
 */
export const menuList: MenuItem[] = [
  { menuSeq: 1, menuNm: "홈", menuUrl: "/dashboard", mainShow: "Y" },
  {
    menuSeq: 2,
    menuNm: "분배금 관리",
    menuUrl: "/dashboard/cashshare",
    mainShow: "Y",
  },
  {
    menuSeq: 3,
    menuNm: "조직도",
    menuUrl: "/dashboard/org",
    mainShow: "Y",
  },
  {
    menuSeq: 4,
    menuNm: "공지사항",
    menuUrl: "/dashboard/notice",
    mainShow: "Y",
  },
  {
    menuSeq: 5,
    menuNm: "공지사항 상세",
    menuUrl: "/dashboard/notice/detail",
    mainShow: "N",
  },
  {
    menuSeq: 6,
    menuNm: "업데이트",
    menuUrl: "/dashboard/update",
    mainShow: "N",
  },
  {
    menuSeq: 7,
    menuNm: "업데이트 상세",
    menuUrl: "/dashboard/update/detail",
    mainShow: "N",
  },
  {
    menuSeq: 8,
    menuNm: "커뮤니티",
    menuUrl: "/dashboard/community",
    mainShow: "Y",
  },
];
