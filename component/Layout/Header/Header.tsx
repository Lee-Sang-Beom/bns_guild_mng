import { MenuItem } from "@/types/common/commonType";
import HeaderClient from "./HeaderClient";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
export default async function Header() {
  const session = await getServerSession(authOptions);

  return <HeaderClient session={session || null} />;
}
