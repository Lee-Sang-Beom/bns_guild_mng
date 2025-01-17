import { OrgRightTabClient } from "./OrgRightTabClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";

export async function OrgRightTabServer() {
  const session = await getServerSession(authOptions);

  return <OrgRightTabClient session={session!} />;
}
