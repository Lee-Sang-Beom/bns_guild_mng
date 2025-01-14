import moment from "moment";
import { addCommaRegex } from "../vaildation/regex/regex";
import bcrypt from "bcryptjs";

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
  if (baseString != "0" && !baseString) {
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

/**
 * @name encryptPassword
 * @description 비밀번호를 bcrypt를 사용하여 암호화합니다.
 * @param password 평문 비밀번호
 * @returns 암호화된 비밀번호
 */
export function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10); // salt 생성
  return bcrypt.hashSync(password, salt); // 비밀번호 해싱
}

/**
 * @name verifyPassword
 * @description 평문 비밀번호와 암호화된 비밀번호를 비교합니다.
 * @param plainPassword 평문 비밀번호
 * @param hashedPassword 암호화된 비밀번호
 * @returns 비밀번호가 일치하는지 여부 (true/false)
 */
export function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

/**
 * @name getQueryParams
 * @description 쿼리 스트링을 obj로 반환
 * @param query
 * @returns obj
 */
export function getQueryParams<T>(query: string): T {
  const params = query.split("?")[1].split("&");
  let obj: T = {} as T;
  for (let i = 0; i < params.length; i++) {
    const [key, value] = params[i].split("=");

    // @ts-ignore
    // obj[key] = value;
    obj[key] =
      key === "conditions"
        ? JSON.parse(decodeURIComponent(value).replaceAll("+", " "))
        : value;
  }
  return obj;
}

/**
 * @name makeUrlQuery
 * @description obj를 쿼리 스트링으로 반환
 * @param params
 * @returns url
 */
export function makeUrlQuery(params: Record<string, any>): string {
  return Object.entries(params)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(
        typeof value === "object" ? JSON.stringify(value) : String(value)
      );
      return `${encodedKey}=${encodedValue}`;
    })
    .join("&");
}

/**
 * @name throttle
 * @description 스로틀링 함수 구현
 */
export function throttle(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      return; // 이전 호출이 완료되지 않았다면 무시
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null; // 호출이 완료되면 timeoutId를 초기화
    }, delay);
  };
}

export function compressImages(
  base64Str: string,
  maxWidth = 800,
  maxHeight = 800
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let { width, height } = img;

      // 비율 유지하면서 크기 조정
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx!.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 품질 70%
      resolve(compressedBase64);
    };
  });
}

export async function compressContentImages(content: string): Promise<string> {
  const imageRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/g; // img 태그에서 src 추출
  let match;
  let compressedContent = content;

  while ((match = imageRegex.exec(content)) !== null) {
    const originalBase64 = match[1]; // img src에서 Base64 추출
    if (originalBase64.startsWith("data:image/")) {
      const compressedBase64 = await compressImages(originalBase64); // 이미지 압축
      compressedContent = compressedContent.replace(
        originalBase64,
        compressedBase64
      ); // HTML 업데이트
    }
  }

  return compressedContent;
}
