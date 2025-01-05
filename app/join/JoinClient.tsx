"use client";

import Button from "@/component/common/Button/Button";
import Input from "@/component/common/Input/Input";
import { useState } from "react";

export default function JoinClient() {
  const [id, setId] = useState<string>("");
  return (
    <div style={{ width: "300px" }}>
      <Input
        title="아이디"
        value={id}
        onChange={(e) => {
          setId(e.currentTarget.value.toString());
        }}
      />
      <Input
        title="비밀번호"
        value={id}
        onChange={(e) => {
          setId(e.currentTarget.value.toString());
        }}
      />
      <Button
        id="회원가입"
        title="회원가입"
        color="blue_reverse"
        disabled
        onClick={() => {}}
      >
        제출
      </Button>
    </div>
  );
}
