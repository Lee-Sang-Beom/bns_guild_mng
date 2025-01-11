/**
 * @phoneNumberRegex : 휴대폰번호 유효성체크를 위한 정규식
 * @regionNumberRegex : 지역전화번호 유효성체크를 위한 정규식
 * @phoneAndRegionCommonNumberRegex : 공통 번호 유효성체크를 위한 정규식
 */
export const phoneNumberRegex = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
export const regionNumberRegex =
  /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/;
export const phoneAndRegionCommonNumberRegex = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/;

/**
 * @idRegex : 아이디 유효성체크를 위한 정규식 (4~12글자로 default 지정)
 * @emailRegex : 이메일 유효성체크를 위한 정규식
 * @passwordRegex : 패스워드 유효성 체크를 위한 정규식 (영문, 숫자, 특수문자 혼용 8~20자리)
 */
export const idRegex = /^[a-zA-Z0-9]{4,12}$/;
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
export const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[`~!@@#$%^&*|₩₩₩'₩";:₩/?])[a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]{8,20}$/;

/**
 * @addCommaRegex : 입력된 string에 대해 Number에 대한 toLocaleString()과 같은 효과를 내도록 하는 정규식
 */
export const addCommaRegex = /\B(?=(\d{3})+(?!\d))/g;

/**
 *
 * @generalNumRegex : 숫자로만 이루어진 값인지에 대한 체크를 위한 정규식 (소수점 포함)
 * @onlyKoRegex @onlyEngRegx : 한글만/영어만 입력되었는지 검사할 때 사용
 */
export const generalNumRegex = /^\d+(\.\d+)?$/;
export const onlyKoRegex = /^[ㄱ-ㅎ|가-힣\s]{2,}$/;
export const onlyEngRegex = /^[a-z|A-Z]+$/;

/**
 * @ETC
 *
 * @MIN_ID_LENGTH : 아이디 최소길이
 * @MAX_ID_LENGTH : 아이디 최대길이
 * @MIN_PW_LENGTH : 비밀번호 최소길이
 * @MAX_PW_LENGTH : 비밀번호 최대길이
 */
export const MIN_ID_LENGTH = 4;
export const MAX_ID_LENGTH = 12;

export const MIN_PW_LENGTH = 8;
export const MAX_PW_LENGTH = 20;
