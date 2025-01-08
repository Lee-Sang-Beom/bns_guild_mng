import { GenderType, UserAuthType } from "@/types/common/commonType";

export interface AddUserRequest {
  id: string;
  password: string;
  authType: UserAuthType;
  job: string;
  gender: GenderType;
  useYn: "Y";
}
