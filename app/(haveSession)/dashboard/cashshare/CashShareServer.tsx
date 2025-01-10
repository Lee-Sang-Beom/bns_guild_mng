import { getServerSession } from "next-auth";
import CashShareClient from "./CashShareClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

export default async function CashShareServer() {
  const session = await getServerSession(authOptions);
  return <CashShareClient session={session!} />;
}
