import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { redirect } from "next/navigation";
import ScheduleClient from "./ScheduleClient";

export default async function ScheduleServer() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dashboard/errors");
  }
  return <ScheduleClient session={session} />;
}
