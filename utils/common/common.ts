import moment from "moment";
import { addCommaRegex } from "../vaildation/regex/regex";

/**
 * @insertFormatToString : TYPE에 따라 적절한 위치에 하이픈(-)을 넣은 새로운 문자열을 반환하는 함수
 *
 * @type : 사업자등록번호(BRNO), 전화번호(TELNO), 날짜(DATE), 일반적인 숫자(NUMBER)
 * @baseString : 변경을 원하는 기존 문자열
 * @incomingMomentDateType : moment 라이브러리에서 baseString이 어떤 타입의 날짜 형식을 가지고 있는 상태인지를 알려주는 포맷
 * @outcomingMomentDateType : moment 라이브러리에서 baseString이 어떤 타입의 날짜 형식을 리턴해야하는지를 알려주는 포맷
 */
export function insertFormatToString(
  type: "BRNO" | "TEL_NO" | "DATE" | "NUMBER",
  baseString: string | number | Date | null | undefined,
  incomingMomentDateType?: string,
  outcomingMomentDateType?: string
) {
  // 예상치 못한 값인 경우 빈 문자열 반환
  if (!baseString) {
    return "";
  }

  // 이미 하이픈(-)이 존재하면 전부 빼버림
  let resultString = baseString.toString().replaceAll("-", "");
  const incomingDateType = incomingMomentDateType || undefined;
  const outcomingDateType = outcomingMomentDateType || "YYYY-MM-DD";

  switch (type) {
    case "BRNO":
      resultString = resultString.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
      break;

    case "TEL_NO":
      resultString = resultString.replace(
        /(\d{2,3})(\d{3,4})(\d{4})/,
        "$1-$2-$3"
      );
      break;

    case "DATE":
      /**
       * 1. incomingDateType이 boolean으로 false에 치환되는 값이라면 일반 Date객체를 대상으로 변환되게끔 구성
       *
       * 2. 만약, 지정한 incomingDateType이 따로 존재하면 그에 따른 패턴으로 string값을 읽어들임
       */
      resultString = incomingDateType
        ? moment(resultString, incomingDateType).format(outcomingDateType)
        : moment(resultString).format(outcomingDateType);
      break;

    case "NUMBER":
      resultString = resultString.toString().replace(addCommaRegex, ",");
    default:
      break;
  }

  return resultString;
}

/**
 * @removeFormatToString : 포맷팅된 별도 요소를 빼버리는 함수 (빈 문자열이면 빈 문자열 반환)
 *
 * @type : 사업자등록번호(BRNO), 전화번호(TELNO), 날짜(DATE), 일반적인 숫자(NUMBER)
 * @baseString : 변경을 원하는 기존 문자열
 */
export function removeFormatToString(
  type: "BRNO" | "TEL_NO" | "DATE" | "NUMBER",
  baseString: string | number | Date | null | undefined
) {
  // 예상치 못한 값이거나 빈 문자열인 경우 빈 문자열 반환
  if (!baseString || baseString.toString().length <= 0) {
    return "";
  } else {
    let resultString = baseString.toString();

    switch (type) {
      case "BRNO":
      case "TEL_NO":
      case "DATE":
        resultString = baseString
          .toString()
          .replace(/-/g, "")
          .replace(/[^0-9]/g, "");
        break;

      case "NUMBER":
        resultString = resultString.toString().replace(/,/g, "");

      default:
        break;
    }

    return resultString;
  }
}
