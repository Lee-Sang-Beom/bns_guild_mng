import { Session } from "next-auth";
import ms from "./Dashboard.module.scss";
import dynamic from "next/dynamic";
import { FaChartPie, FaPaperPlane } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

interface IProps {
  session: Session;
}

// 직업 분포
const DisplayJobListCard = dynamic(() => import("./DisplayJobListCard"), {
  ssr: false,
  loading: () => (
    <div
      className={`${ms.card} ${ms.card_top} ${ms.loading} ${ms.loading_run}`}
    ></div>
  ),
});

// 분배금 관리
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

// 커뮤니티
const DisplayCommunityCard = dynamic(() => import("./DisplayCommunityCard"), {
  ssr: false,
  loading: () => (
    <div
      className={`${ms.card} ${ms.card_middle} ${ms.loading} ${ms.loading_cat}`}
    >
      <span className={ms.loading_text}>Loading...</span>
    </div>
  ),
});

// 공지사항
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

// 업데이트
const DisplayUpdateCard = dynamic(() => import("./DisplayUpdateCard"), {
  ssr: false,
  loading: () => (
    <div
      className={`${ms.card} ${ms.card_middle} ${ms.loading} ${ms.loading_cat}`}
    >
      <span className={ms.loading_text}>Loading...</span>
    </div>
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

      {/* 2. 분배금 관리, 커뮤니티티  */}
      <div className={ms.middle_top}>
        {/* 분배금 관리 */}
        <div className={ms.middle_left}>
          <p className={ms.title}>
            <FaMoneyCheckDollar size={22} role="img" aria-label="돈 아이콘" />
            최근 거래 및 분배정보
          </p>
          <DisplayCashShareCard />
        </div>

        {/* 커뮤니티 */}
        <div className={ms.middle_right}>
          <p className={ms.title}>
            <BiSolidMessageSquareDots
              size={22}
              role="img"
              aria-label="말풍선아이콘"
            />
            최근 커뮤니티 정보
          </p>
          <DisplayCommunityCard />
        </div>
      </div>

      {/* 3. 공지사항, 업데이트  */}
      <div className={ms.middle_bottom}>
        {/* 공지사항 */}
        <div className={ms.middle_left}>
          <p className={ms.title}>
            <FaPaperPlane
              size={22}
              role="img"
              aria-label="공지사항 종이 아이콘"
            />
            최근 공지사항 정보
          </p>
          <DisplayNoticeCard />
        </div>

        {/* 업데이트 */}
        <div className={ms.middle_right}>
          <p className={ms.title}>
            <MdOutlineTipsAndUpdates
              size={22}
              role="img"
              aria-label="업데이트 알림용 전구 아이콘"
            />
            최근 업데이트 정보
          </p>
          <DisplayUpdateCard />
        </div>
      </div>
    </div>
  );
}
