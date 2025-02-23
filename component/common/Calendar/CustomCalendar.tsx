import { SetStateAction } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.scss";

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

/**
 * @name IProps
 * @description
 * - `selectedDate`: 현재 선택된 날짜 값을 부모에서 전달받아 표시
 * - `onChange`: 날짜가 변경될 때 호출되는 이벤트 핸들러 (부모에서 상태 업데이트)
 */
interface IProps {
  /**
   * @property {SelectedDate} selectedDate
   * @description 현재 선택된 날짜 (단일 날짜 또는 날짜 범위)
   */
  selectedDate: SelectedDate;

  /**
   * @property {React.Dispatch<SetStateAction<SelectedDate>>} onChange
   * @description 날짜 선택 시 부모 컴포넌트의 상태를 업데이트하는 함수
   */
  onChange: React.Dispatch<SetStateAction<SelectedDate>>;
}

/**
 * @name CustomCalendar
 * @description
 * - React-Calendar를 감싸는 커스텀 캘린더 컴포넌트
 * - 부모 컴포넌트에서 상태를 관리하고, 날짜가 변경되면 `onChange`를 통해 반영됨
 */
export default function CustomCalendar({ selectedDate, onChange }: IProps) {
  return (
    <div className="react-calendar-box">
      <Calendar
        calendarType="gregory"
        onChange={onChange} // 부모에서 전달된 상태 업데이트 함수 실행
        value={selectedDate} // 부모에서 전달된 현재 날짜 값
        locale="ko-KR"
        minDetail="year"
        prev2Label={null} // "<<" 버튼 비활성화
        next2Label={null} // ">>" 버튼 비활성화
      />
    </div>
  );
}
