import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/AuthOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("session is ", session);
  return <div>홈페이지입니다.</div>;
}
