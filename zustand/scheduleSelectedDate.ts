import { create } from "zustand";
import { SelectedDate } from "@/component/common/Calendar/CustomCalendar"; // SelectedDate 타입 가져오기

/**
 * @name ScheduleState
 * @description
 * - 전역 상태로 관리할 일정 선택 날짜(`selectedDate`)와 해당 상태를 업데이트하는 함수(`setSelectedDate`)를 포함한 인터페이스
 */
interface ScheduleState {
  /**
   * @property {SelectedDate} selectedDate
   * @description 현재 선택된 날짜 (단일 날짜 또는 날짜 범위)
   */
  selectedDate: SelectedDate;

  /**
   * @property {(newDate: SelectedDate) => void} setSelectedDate
   * @description 새로운 날짜를 설정하는 함수
   * @param {SelectedDate} newDate - 변경할 날짜 값 (단일 날짜 또는 날짜 범위)
   */
  setSelectedDate: (newDate: SelectedDate) => void;
}

/**
 * @name useScheduleSelectedDate
 * @description
 * - Zustand를 사용하여 `selectedDate` 상태를 전역적으로 관리
 * - `setSelectedDate`를 통해 선택된 날짜를 업데이트
 */
const useScheduleSelectedDate = create<ScheduleState>((set) => ({
  selectedDate: new Date(), // 초기값: 오늘 날짜
  setSelectedDate: (newDate) => set({ selectedDate: newDate }), // 새로운 날짜로 상태 업데이트
}));

export default useScheduleSelectedDate;
