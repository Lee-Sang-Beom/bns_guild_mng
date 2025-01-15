import { Session } from "next-auth";
import ms from "./Dashboard.module.scss";
import dynamic from "next/dynamic";
import { FaChartPie, FaPaperPlane } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
interface IProps {
  session: Session;
}
const DisplayNoticeCard = dynamic(() => import("./DisplayNoticeCard"), {
  ssr: false,
  loading: () => (
    <div
      className={`${ms.card} ${ms.card_middle} ${ms.loading} ${ms.loading_cat}`}
    >
      <span className={ms.loading_text}>Loading...</span>
    </div>
  ),
});
const DisplayCashShareCard = dynamic(() => import("./DisplayCashShareCard"), {
  ssr: false,
  loading: () => (
    <div
      className={`${ms.card} ${ms.card_middle} ${ms.loading} ${ms.loading_cat}`}
    >
      <span className={ms.loading_text}>Loading...</span>
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
      <div className={ms.middle}>
        {/* 2. 분배 리스트 */}
        <div className={ms.middle_left}>
          <p className={ms.title}>
            <FaPaperPlane
              size={22}
              role="img"
              aria-label="공지사항 종이 아이콘"
            />
            최근 거래 및 분배정보
          </p>
          <DisplayCashShareCard />
        </div>
        {/* 3. 공지사항 */}
        <div className={ms.middle_right}>
          <p className={ms.title}>
            <MdOutlineAttachMoney size={22} role="img" aria-label="돈 아이콘" />
            최근 공지사항
          </p>
          <DisplayNoticeCard />
        </div>
      </div>
    </div>
  );
}
