import {
  emailRegex,
  idRegex,
  phoneNumberRegex,
  regionNumberRegex,
} from "../regex/regex";

/**
 * @name returnIdEffectivenessMsg
 * @description 아이디 유효성 검사
 */
export function returnIdEffectivenessMsg(required: boolean, value: string) {
  // 아무것도 입력 안되었을 때는 오류메시지를 지운다.
  if (!required && value === "" && value.length === 0) {
    return {
      isSuccess: true,
      msg: "",
    };
  }
  if (required && value === "" && value.length === 0) {
    return {
      isSuccess: false,
      msg: "아이디를 입력해주세요.",
    };
  }

  if (!idRegex.test(value)) {
    return {
      isSuccess: false,
      msg: "아이디는 4글자 이상, 12글자 이하의 영문과 숫자로 입력해주세요.",
    };
  } else {
    return {
      isSuccess: true,
      msg: "사용가능한 아이디입니다.",
    };
  }
}

/**
 * @name returnPwEffectivenessMsg
 * @description 패스워드드 유효성 검사
 */
export function returnPwEffectivenessMsg(required: boolean, value: string) {
  // 아무것도 입력 안되었을 때는 오류메시지를 지운다.
  if (!required && value === "" && value.length === 0) {
    return {
      isSuccess: true,
      msg: "",
    };
  }

  if (required && value === "" && value.length === 0) {
    return {
      isSuccess: false,
      msg: "비밀번호를 입력해주세요.",
    };
  }

  const num = value.search(/[0-9]/g);
  const eng = value.search(/[a-z]/gi);
  const spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (value.length < 8 || value.length > 20) {
    return {
      isSuccess: false,
      msg: "영문, 숫자, 특수문자를 혼용하여 8~20자리로 입력해주세요.",
    };
  } else if (num < 0 || eng < 0 || spe < 0) {
    return {
      isSuccess: false,
      msg: "영문, 숫자, 특수문자를 혼용하여 8~20자리로 입력해주세요.",
    };
  } else if (value.search(/\s/) != -1) {
    return {
      isSuccess: false,
      msg: "비밀번호는 공백 없이 입력해주세요.",
    };
  } else {
    return {
      isSuccess: true,
      msg: "사용가능한 비밀번호입니다.",
    };
  }
}

/**
 * @name returnPwConfirmEffectivenessMsg
 * @description 패스워드 확인 유효성 검사
 */
export function returnPwConfirmEffectivenessMsg(
    required: boolean,
    basePw: string,
    inputPw: string
) {
  // 아무것도 입력 안되었을 때는 오류메시지를 지운다.
  if (!required && inputPw === "") {
    return {
      isSuccess: true,
      msg: "",
    };
  }

  if (required && inputPw === "") {
    return {
      isSuccess: false,
      msg: "비밀번호가 일치하지 않습니다.",
    };
  }

  if (basePw === inputPw) {
    return {
      isSuccess: true,
      msg: "비밀번호가 일치합니다.",
    };
  } else {
    return {
      isSuccess: false,
      msg: "비밀번호가 일치하지 않습니다.",
    };
  }
}

/**
 * @name returnRegionNumberEffectivenessMsg
 * @description 전화번호(기관 | 지역 전화번호) 유효성 검사
 */
export function returnRegionNumberEffectivenessMsg(
    required: boolean,
    value: string
) {
  // 아무것도 입력 안되었을 때는 오류메시지를 지운다.
  if (!required && value === "" && value.length === 0) {
    return {
      isSuccess: true,
      msg: "",
    };
  }

  if (required && value === "" && value.length === 0) {
    return {
      isSuccess: false,
      msg: "지역 전화번호를 입력해주세요.",
    };
  }

  if (regionNumberRegex.test(value)) {
    return {
      isSuccess: true,
      msg: "사용가능한 전화번호입니다.",
    };
  } else {
    return {
      isSuccess: false,
      msg: "지역 전화번호 형식이 올바르지 않습니다.",
    };
  }
}

/**
 * @name returnPhoneEffectivenessMsg
 * @description 휴대폰 전화번호 유효성 검사
 */
export function returnPhoneEffectivenessMsg(required: boolean, value: string) {
  // 아무것도 입력 안되었을 때는 오류메시지를 지운다.
  if (!required && value === "" && value.length === 0) {
    return {
      isSuccess: true,
      msg: "",
    };
  }

  if (required && value === "" && value.length === 0) {
    return {
      isSuccess: false,
      msg: "휴대폰 번호를 입력해주세요.",
    };
  }

  if (phoneNumberRegex.test(value)) {
    return {
      isSuccess: true,
      msg: "",
    };
  } else {
    return {
      isSuccess: false,
      msg: "휴대폰 번호 형식이 올바르지 않습니다.",
    };
  }
}

/**
 * @name returnEmailEffectivenessMsg
 * @description 이메일 유효성 검사
 */
export function returnEmailEffectivenessMsg(required: boolean, value: string) {
  // 아무것도 입력 안되었을 때는 오류메시지를 지운다.
  if (!required && value === "" && value.length === 0) {
    return {
      isSuccess: true,
      msg: "",
    };
  }

  if (required && value === "" && value.length === 0) {
    return {
      isSuccess: false,
      msg: "이메일을 입력해주세요.",
    };
  }

  if (emailRegex.test(value)) {
    return {
      isSuccess: true,
      msg: "사용 가능한 이메일 주소입니다.",
    };
  } else {
    return {
      isSuccess: false,
      msg: "이메일 형식이 올바르지 않습니다.",
    };
  }
}
