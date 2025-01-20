import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";
import CommunityServer from "./CommunityServer";

export default function Page({
  searchParams,
}: {
  searchParams: CommunityRequest;
}) {
  return <CommunityServer searchParams={searchParams} />;
}
