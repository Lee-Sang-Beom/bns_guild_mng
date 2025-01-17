import ms from "./Org.module.scss";
import Tab from "@/component/common/Tab/Tab";
import { OrgLeftTab } from "./OrgLeftTab";
import { OrgRightTabServer } from "./OrgRightTabServer";

export default function OrgClient() {
  return (
    <div className={ms.wrap}>
      <Tab tabTitle={["구성 문파원", "문파원 회원가입 관리"]} color="blue">
        <OrgLeftTab />
        <OrgRightTabServer />
      </Tab>
    </div>
  );
}
