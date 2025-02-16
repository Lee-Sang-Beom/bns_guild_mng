import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import OrgMiddleTabClient from "./OrgMiddleTabClient";

export default async function OrgMiddleTabServer() {
  const session = await getServerSession(authOptions);

  return <OrgMiddleTabClient session={session!} />;
}
