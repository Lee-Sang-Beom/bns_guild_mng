import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.scss";
import moment from "moment";

/**
 * @name DatePiece
 * @description 선택 가능한 날짜 (미선택 시 null)
 *
 * @name SelectedDate
 * @description
 * 선택된 날짜 타입
 * (캘린더 옵션에 따라 날짜 복수선택이 가능하지만, 현 프로젝트에서는 그렇게 하지 않을 것임)
 */
export type DatePiece = Date | null;
export type SelectedDate = DatePiece;
// export type SelectedDate = DatePiece | [DatePiece, DatePiece];

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
   * @property {(newDate: SelectedDate) => void} onChange
   * @description 날짜 선택 시 부모 컴포넌트의 상태를 업데이트하는 함수
   */
  onChange: (newDate: SelectedDate) => void;

  /**
   * @property {SelectedDate[]} dateList
   * @description 사전에 기록되어 있는 Date 타입의 배열
   */
  dateList: SelectedDate[];
}

/**
 * @name CustomCalendar
 * @description
 * - React-Calendar를 감싸는 커스텀 캘린더 컴포넌트
 * - 부모 컴포넌트에서 상태를 관리하고, 날짜가 변경되면 `onChange`를 통해 반영됨
 */
export default function CustomCalendar({
  selectedDate,
  onChange,
  dateList,
}: IProps) {
  return (
    <div className="react-calendar-box">
      <Calendar
        calendarType="gregory"
        onChange={(value) => onChange(value as SelectedDate)} // 타입 캐스팅 추가
        value={selectedDate} // 부모에서 전달된 현재 날짜 값
        locale="ko-KR"
        minDetail="year"
        prev2Label={null} // "<<" 버튼 비활성화
        next2Label={null} // ">>" 버튼 비활성화
        formatDay={(local, date) => moment(date).format("D")} // 01일 -> 1일 처럼 변경
        tileContent={({ date, view }) => {
          // 해당 날짜가 dateList에 몇 개 포함되는지 카운트
          let tileCount = dateList.filter(
            (x) =>
              x &&
              moment(x).format("YYYY-MM-DD") ===
                moment(date).format("YYYY-MM-DD")
          ).length;

          // 최대 10개
          tileCount = tileCount > 10 ? 10 : tileCount;

          return (
            <div className="dot_box">
              {Array.from({ length: tileCount }, (_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
