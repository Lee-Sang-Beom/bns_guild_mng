"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";

interface IProps {
  session: Session;
  userList: UserResponse[];
}
export default function OrgLeftTabClient({ session, userList }: IProps) {
  return <>개발중입니당</>;
}
