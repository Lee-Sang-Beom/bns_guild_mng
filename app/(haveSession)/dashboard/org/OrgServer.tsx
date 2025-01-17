import { getServerSession } from "next-auth";
import OrgClient from "./OrgClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

export default async function OrgServer() {
  const session = await getServerSession(authOptions);

  return <OrgClient session={session!} />;
}
