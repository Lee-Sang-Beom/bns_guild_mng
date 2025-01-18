"use client";

import { useState } from "react";
import ms from "./FindPw.module.scss";
import FindPwStep1 from "./FindPwStep1";
import { User } from "next-auth";
import FindPwStep2 from "./FindPwStep2";
import FindPwStep3 from "./FindPwStep3";

export default function FindPwClient() {
  const [step, setStep] = useState<number>(1);
  const [findUser, setFindUser] = useState<User | null>(null);

  return (
    <div className={ms.wrap}>
      {step === 1 ? (
        <FindPwStep1 setStep={setStep} setFindUser={setFindUser} />
      ) : step === 2 ? (
        <FindPwStep2
          setStep={setStep}
          findUser={findUser}
          setFindUser={setFindUser}
        />
      ) : (
        <FindPwStep3 />
      )}
    </div>
  );
}
