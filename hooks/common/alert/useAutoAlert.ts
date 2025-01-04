"use client";

import { openAlertState, openAlertStatus, openAlertText } from "@/recoil/autoAlert";
import { StatusType } from "@/types/common/commonType";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

// customHook : useAutoAlert
function useAutoAlert() {
  /**
   * @isChange @setIsChange : useAutoAlert에서 사용하는 내부 boolean state.
   * recoil로 관리되는 atom을 변경할 지 말지를 결정한다.
   */
  const [isChange, setIsChange] = useState<boolean>(false);

  /**
   * @setOpenState : autoAlert 창을 표시할지 표시하지 않을지를 직접적으로 결정한다.
   * isChange 값에 따라 1.5s 간 true값을 가진다.
   */
  const [, setOpenState] = useRecoilState(openAlertState);

  /**
   * @setText : autoAlert 창에 표시될 텍스트를 결정한다.
   * isChange 값에 따라 1.5s 간 전달된 텍스트가 사용되다가, 빈 텍스트로 변경된다.
   */
  const [, setText] = useRecoilState(openAlertText);

  /**
   *  @setStatus : autoAlert 창에 표시될 alert의 status를 결정한다.
   */
  const [, setStatus] = useRecoilState<StatusType>(openAlertStatus);

  useEffect(() => {
    /**
     * 1. 만약 사용자 클릭으로 인해 isChange가 true로 바뀌면 AutoAlert 창을 띄워주는 아래 코드를 수행해줌
     */
    if (isChange) {
      /**
       * 2. recoil 비동기적 특성으로 변경사항이 즉시반영되지 않는 문제발생
       * 값의 변경을 기다리는 시간 이후, set코드를 수행하면 문제없음
       */
      setTimeout(() => {
        /**
         * 3. recoil로 관리되는 boolean, string state도 true로 바꿔 화면에 표시되도록 함
         * 이는 일정 시간 후 초기화됨
         */
        setOpenState(true);
        setTimeout(() => {
          setIsChange(false);
          setOpenState(false);
        }, 1500);
      }, 150);
    }
  }, [isChange]);

  /**
   * @setIsChange : Dispatch<SetStateAction<boolean>> type으로, true로 변경하면 그때부터 AutoAlert이 표시됨
   * @setText : AutoAlert에 표시될 텍스트
   * @setStatus : AutoAlert의 상태(표시 색깔)로, error, info, success, warning
   */
  return { setIsChange, setText, setStatus };
}

export { useAutoAlert };
