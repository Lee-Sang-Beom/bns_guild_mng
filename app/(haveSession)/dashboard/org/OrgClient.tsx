import ms from "./Org.module.scss";
import Tab from "@/component/common/Tab/Tab";
import OrgLeftTabServer from "./OrgLeftTabServer";
import OrgRightTabServer from "./OrgRightTabServer";

export default function OrgClient() {
  const tabTitle = [
    "권한별 문파원 리스트",
    // "직업별 문파원 리스트",
    "문파원 회원가입 관리",
  ];
  return (
    <div className={ms.wrap}>
      <Tab tabTitle={tabTitle} color="blue">
        <OrgLeftTabServer />
        <OrgRightTabServer />
      </Tab>
    </div>
  );
}
