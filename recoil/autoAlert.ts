import { StatusType } from "@/types/common/commonType";
import { atom } from "recoil";

// 화면에 autoAlert을 띄울지 말지를 결정하는 true/false atom recoilstate
export const openAlertState = atom({
  key: "openAlertState",
  default: false,
});

// autoAlert에 어떤 텍스트를 띄울지를 결정하는 string atom recoilstate
export const openAlertText = atom({
  key: "openAlertText",
  default: "",
});

// autoAlert이 어떤 성격(출력 색깔)을 가질지를 결정하는 string atom recoilstate
// success, warning, info, error 4가지의 type을 가진다.
export const openAlertStatus = atom<StatusType>({
  key: "openAlertStatus",
  default: "success",
});
