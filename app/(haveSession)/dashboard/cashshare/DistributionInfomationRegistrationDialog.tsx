import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DistributionInfomationRegistrationDialog({
  session,
  setOpen,
}: IProps) {
  return <></>;
}
