import { SelectedDate } from "@/component/common/Calendar/CustomCalendar";
import { Timestamp } from "firebase/firestore";

/**
 * @name ScheduleResponse
 * @description 분배정보 조회 응답
 */
export interface ScheduleResponse {
  /**
   * @name docId
   * @description firebase 문서번호
   */
  docId: string;

  /**
   * @name writerId
   * @description 작성자 ID
   */
  writerId: string;

  /**
   * @name content
   * @description 일정내용
   */
  content: string;

  /**
   * @name baseDt
   * @description 선택일자
   */
  baseDt: SelectedDate;

  /**
   * @name regDt
   * @description 정보등록 일시
   */
  regDt: Timestamp | null;
}
