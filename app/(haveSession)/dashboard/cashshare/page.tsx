import { CashshareRequest } from "@/types/haveSession/dashboard/cashshare/request";
import CashShareServer from "./CashShareServer";

export default function Page({
  searchParams,
}: {
  searchParams: CashshareRequest;
}) {
  return <CashShareServer searchParams={searchParams} />;
}
