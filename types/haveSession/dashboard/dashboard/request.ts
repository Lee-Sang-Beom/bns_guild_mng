import { GenderType, UserAuthType } from "@/types/common/commonType";

export interface ModifyUserRequest {
  id: string;
  password: string;
  authType: UserAuthType;
  job: string;
  gender: GenderType;
  useYn: "Y" | "N";
  userBirth: string;
}
