import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import OrgLeftTabClient from "./OrgLeftTabClient";

export default async function OrgLeftTabServer() {
  const session = await getServerSession(authOptions);

  return <OrgLeftTabClient session={session!} />;
}
