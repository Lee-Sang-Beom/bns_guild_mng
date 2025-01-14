import { NoticeRequest } from "@/types/haveSession/dashboard/notice/request";
import NoticeServer from "./NoticeServer";

export default function Page({
  searchParams,
}: {
  searchParams: NoticeRequest;
}) {
  return <NoticeServer searchParams={searchParams} />;
}
