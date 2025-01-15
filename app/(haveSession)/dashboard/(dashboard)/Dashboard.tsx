import { Session } from "next-auth";
import ms from "./Dashboard.module.scss";
import dynamic from "next/dynamic";
import { FaChartPie } from "react-icons/fa";
interface IProps {
  session: Session;
}

const DisplayCashShareCard = dynamic(() => import("./DisplayCashShareCard"), {
  ssr: false,
  loading: () => (
    <div className={`${ms.card} ${ms.loading}`}>
      정보를 불러오고 있습니다...
    </div>
  ),
});
const DisplayJobListCard = dynamic(() => import("./DisplayJobListCard"), {
  ssr: false,
  loading: () => (
    <div
      className={`${ms.card} ${ms.card_top} ${ms.loading} ${ms.loading_run}`}
    ></div>
  ),
});

export default function Dashboard({ session }: IProps) {
  return (
    <div className={ms.wrap}>
      {/* 1. 문파 내 직업분포 - 차트 */}
      <div className={ms.top}>
        <p className={ms.title}>
          <FaChartPie size={22} role="img" aria-label="차트 아이콘" />
          문파 직업 분포
        </p>
        <DisplayJobListCard />
      </div>
      {/* 2. 분배 리스트 */}
      {/* 3. 공지사항 */}
    </div>
  );
}
