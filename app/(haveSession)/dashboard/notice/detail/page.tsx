import { NoticeRequest } from "@/types/haveSession/dashboard/notice/request";
import NoticeDetailServer from "./NoticeDetailServer";

interface PageProps {
  searchParams: {
    doc: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  return <NoticeDetailServer docId={searchParams.doc} />;
}
