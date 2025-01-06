import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("session is ", session);
  return <>대시보드</>;
}
