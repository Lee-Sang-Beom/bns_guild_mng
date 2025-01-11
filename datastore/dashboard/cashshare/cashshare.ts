import { SelectboxType } from "@/component/common/Selectbox/Selectbox";

export const distributionStepList: SelectboxType[] = [
  {
    name: "거래등록 (시장 등록 완료)",
    value: "TRANSACTION_REGISTRATION",
    group: "",
  },
  {
    name: "거래완료 (시장 거래 완료)",
    value: "TRANSACTION_COMPLETED",
    group: "",
  },
  {
    name: "분배완료 (파티원 분배 완료)",
    value: "DISTRIBUTION_COMPLETED",
    group: "",
  },
];
