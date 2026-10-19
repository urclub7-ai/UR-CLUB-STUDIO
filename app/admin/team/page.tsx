import { getTeamMembers } from "@/lib/actions/team-actions";
import TeamClient from "./TeamClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مدیریت اعضای تیم | UR CLUB Admin",
};

export default async function AdminTeamPage() {
  const members = await getTeamMembers();
  return <TeamClient initialMembers={members} />;
}
