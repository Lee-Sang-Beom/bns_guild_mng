import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import Dashboard from "./Dashboard";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <Dashboard session={session} />;
}
