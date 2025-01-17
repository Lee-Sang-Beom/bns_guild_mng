import { UpdateRequest } from "@/types/haveSession/dashboard/update/request";
import UpdateServer from "./UpdateServer";

export default function Page({
  searchParams,
}: {
  searchParams: UpdateRequest;
}) {
  return <UpdateServer searchParams={searchParams} />;
}
