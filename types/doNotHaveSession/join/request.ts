import { UserAuthType } from "@/types/common/commonType";

export interface AddUserRequest {
  id: string;
  password: string;
  authType: UserAuthType;
  useYn: "Y";
}
