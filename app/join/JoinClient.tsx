"use client";

import Input from "@/component/common/Input/Input";
import { useState } from "react";

export default function JoinClient() {
  const [id, setId] = useState<string>("");
  return (
    <div style={{ width: "100%" }}>
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
        disabled
        onChange={(e) => {
          setId(e.currentTarget.value.toString());
        }}
      />
    </div>
  );
}
