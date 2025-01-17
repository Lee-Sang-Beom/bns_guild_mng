import { Session } from "next-auth";
import ms from "./Org.module.scss";
import Tab from "@/component/common/Tab/Tab";
import { OrgLeftTab } from "./OrgLeftTab";
import { OrgRightTab } from "./OrgRightTab";

interface IProps {
  session: Session;
}
export default function OrgClient({ session }: IProps) {
  return (
    <div className={ms.wrap}>
      <Tab tabTitle={["전력 사용량 등록", "연료 사용량 등록"]} color="blue">
        <OrgLeftTab />
        <OrgRightTab />
      </Tab>
    </div>
  );
}
